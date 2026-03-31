import { classifyExecutionError, detectPreferredRuntime } from './classify.js';
import { APP_CONFIG, FOUNDATION_OUTPUT } from './config.js';
import {
  EXAMPLES,
  filterExamples,
  findMatchingExampleBySource,
  getExampleLibraryTopic,
  getExampleById,
  getRandomExample,
} from './examples.js';
import { buildIssueUrl } from './issue.js';
import { truncateOutput } from './limits.js';
import { validateSourcePolicy } from './policy.js';
import { createRuntimeController } from './runtime.js';
import { buildShareUrl, parseShareFragment } from './share.js';
import { buildStarterSource, normalizeExampleSource } from './starter.js';
import { loadDraft, resolveInitialSource, saveDraft } from './storage.js';
import {
  getNextThemePreference,
  getThemeToggleLabel,
  loadThemePreference,
  resolveThemePreference,
  saveThemePreference,
} from './theme.js';

function debounce(fn, waitMs) {
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), waitMs);
  };
}

function installTabBehavior(textarea) {
  textarea.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    event.preventDefault();
    const { selectionStart, selectionEnd, value } = textarea;
    const nextValue = `${value.slice(0, selectionStart)}    ${value.slice(selectionEnd)}`;
    textarea.value = nextValue;
    textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

function isSelectAllShortcut(event) {
  return (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a';
}

function installEditorSelectionBehavior(textarea) {
  textarea.addEventListener('keydown', (event) => {
    if (!isSelectAllShortcut(event)) {
      return;
    }

    event.preventDefault();
    textarea.selectionStart = 0;
    textarea.selectionEnd = textarea.value.length;
  });
}

function installOutputSelectionBehavior(element) {
  element.addEventListener('keydown', (event) => {
    if (!isSelectAllShortcut(event)) {
      return;
    }

    event.preventDefault();
    selectAllElementText(element);
  });
}

function buildExampleListItem(example, onLoad) {
  const item = document.createElement('li');
  item.className = 'example-list__item';
  item.dataset.exampleId = example.id;

  const action = document.createElement('button');
  action.className = 'example-list__link';
  action.type = 'button';
  action.textContent = example.title;
  action.addEventListener('click', () => onLoad(example.id));

  const meta = document.createElement('span');
  meta.className = 'example-list__meta';
  meta.textContent = getExampleLibraryTopic(example);

  item.append(action, meta);
  return item;
}

function formatRuntimeLabel(runtime) {
  return runtime === 'full' ? 'Full Python' : 'Fast Python';
}

function formatRunHeader(runCount, runtime) {
  return `\n=== Run ${runCount} · ${formatRuntimeLabel(runtime)} ===\n`;
}

function formatErrorBlock(error) {
  const lines = [];

  if (error?.name && error?.message) {
    lines.push(`${error.name}: ${error.message}`);
  } else if (error?.message) {
    lines.push(error.message);
  } else {
    lines.push('Execution failed.');
  }

  if (error?.stack) {
    lines.push('', error.stack);
  }

  return `${lines.join('\n')}\n`;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'readonly');
  textarea.className = 'sr-only';
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function selectAllElementText(element) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export async function createApp() {
  const documentRoot = document.documentElement;
  const editor = document.querySelector('#editor');
  const output = document.querySelector('#output');
  const statusMessage = document.querySelector('#status-message');
  const themeToggleButton = document.querySelector('#theme-toggle-button');
  const themeColorMeta = document.querySelector('#theme-color-meta');
  const routeExampleId = document.body.dataset.routeExampleId ?? null;
  const examplesDialog = document.querySelector('#examples-dialog');
  const examplesList = document.querySelector('#examples-list');
  const exampleSearch = document.querySelector('#example-search');
  const examplesTitle = document.querySelector('#examples-title');
  const reportIssueLink = document.querySelector('#report-issue-link');
  const copyShareLinkButton = document.querySelector('#copy-share-link-button');
  const copyOutputButton = document.querySelector('#copy-output-button');
  const loadExampleButton = document.querySelector('#load-example-button');
  const clearOutputButton = document.querySelector('#clear-output-button');
  const runButton = document.querySelector('#run-button');
  const donationCta = document.querySelector('#donation-cta');
  const runtimePrompt = document.querySelector('#runtime-prompt');
  const runtimePromptMessage = document.querySelector('#runtime-prompt-message');
  const retryFullRuntimeButton = document.querySelector('#retry-full-runtime-button');
  const dismissRuntimePromptButton = document.querySelector('#dismiss-runtime-prompt-button');

  const routeExample = routeExampleId ? getExampleById(routeExampleId) : null;
  const defaultExample =
    routeExample ?? getRandomExample() ?? getExampleById(APP_CONFIG.defaultExampleId) ?? EXAMPLES[0];
  const fragmentState = parseShareFragment(window.location.hash, EXAMPLES);
  const localDraft = routeExample ? null : loadDraft();
  const systemThemeQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
  const resolvedInitialState = resolveInitialSource({
    fragmentState,
    localDraft,
    defaultExample,
  });
  const shouldUseStarterExample =
    !routeExample && !fragmentState?.source && !fragmentState?.error && !localDraft?.source;
  const initialState = shouldUseStarterExample
    ? {
        ...resolvedInitialState,
        source: buildStarterSource(defaultExample.source),
        exampleId: defaultExample.id,
        runtimeHint: defaultExample.runtime,
      }
    : resolvedInitialState;

  const fullRuntimeMemo = new Set();

  function resolveRuntimeHint(source, exampleId = null, persistedRuntimeHint = null) {
    const exampleRuntime = exampleId ? getExampleById(exampleId)?.runtime ?? null : null;

    if (
      persistedRuntimeHint === 'full' ||
      exampleRuntime === 'full' ||
      detectPreferredRuntime(source) === 'full' ||
      fullRuntimeMemo.has(source)
    ) {
      return 'full';
    }

    return exampleRuntime ?? persistedRuntimeHint ?? 'fast';
  }

  const state = {
    source: initialState.source,
    exampleId: initialState.exampleId,
    runtimeHint: resolveRuntimeHint(
      initialState.source,
      initialState.exampleId,
      initialState.runtimeHint ?? defaultExample.runtime ?? 'fast',
    ),
    runCount: 0,
    hadRunOutput: false,
    themePreference: loadThemePreference(),
  };

  function renderStatus(message) {
    statusMessage.textContent = message;
  }

  function renderTheme() {
    const systemPrefersDark = systemThemeQuery?.matches ?? false;
    const resolvedTheme = resolveThemePreference(
      state.themePreference,
      systemPrefersDark,
    );

    if (!state.themePreference) {
      documentRoot.removeAttribute('data-theme');
    } else {
      documentRoot.dataset.theme = resolvedTheme;
    }

    if (themeToggleButton) {
      const nextThemePreference = getNextThemePreference(state.themePreference, systemPrefersDark);
      themeToggleButton.textContent = getThemeToggleLabel(state.themePreference, systemPrefersDark);
      themeToggleButton.title = `Switch to ${nextThemePreference === 'dark' ? 'night' : 'day'} mode.`;
      themeToggleButton.setAttribute(
        'aria-label',
        `${getThemeToggleLabel(
          state.themePreference,
          systemPrefersDark,
        )}. Click to switch to ${nextThemePreference === 'dark' ? 'night' : 'day'} mode.`,
      );
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#0a0a23' : '#f5f6f7',
      );
    }
  }

  function updateIssueLink() {
    const shareState = buildShareUrl({
      source: state.source,
      runtimeHint: state.runtimeHint,
      examples: EXAMPLES,
    });

    const example = state.exampleId ? getExampleById(state.exampleId) : null;
    const isCustomScript =
      !example || normalizeExampleSource(example.source) !== normalizeExampleSource(state.source);

    reportIssueLink.href = buildIssueUrl({
      currentUrl: shareState.url,
      example,
      runtimeHint: state.runtimeHint,
      isCustomScript,
    });
  }

  function persistDraft() {
    saveDraft({
      source: state.source,
      exampleId: state.exampleId,
      runtimeHint: state.runtimeHint,
      savedAt: new Date().toISOString(),
    });
  }

  function renderExampleList(query = '') {
    const results = filterExamples(query);

    if (results.length === 0) {
      const emptyState = document.createElement('li');
      emptyState.className = 'examples-list__empty';
      emptyState.textContent = 'No scripts found.';
      examplesList.replaceChildren(emptyState);
    } else {
      examplesList.replaceChildren(
        ...results.map((example) =>
          buildExampleListItem(example, (exampleId) => {
            const nextExample = getExampleById(exampleId);
            applySource(nextExample.source, nextExample.id);
            renderStatus(`Loaded ${nextExample.title}.`);
            examplesDialog.close();
          }),
        ),
      );
    }

    examplesTitle.textContent = `Library of ${results.length} Python Script${
      results.length === 1 ? '' : 's'
    }`;
  }

  function setRuntimePrompt(message = '') {
    if (!message) {
      runtimePrompt.hidden = true;
      runtimePromptMessage.textContent =
        'This script may need Full Python. Retry with Full Python?';
      return;
    }

    runtimePromptMessage.textContent = message;
    runtimePrompt.hidden = false;
  }

  function appendOutput(text) {
    output.textContent += text;
    output.scrollTop = output.scrollHeight;
  }

  function resetOutputPanel(nextText = FOUNDATION_OUTPUT) {
    output.textContent = nextText;
    state.hadRunOutput = false;
    donationCta.hidden = true;
    output.scrollTop = 0;
  }

  function clearOutputPanel() {
    resetOutputPanel(FOUNDATION_OUTPUT);
    setRuntimePrompt('');
  }

  function setRunningState(isRunning) {
    runButton.disabled = isRunning;
  }

  function chooseRuntime(forceRuntime = null) {
    if (forceRuntime) {
      return forceRuntime;
    }

    if (resolveRuntimeHint(state.source, state.exampleId, state.runtimeHint) === 'full') {
      return 'full';
    }

    return 'fast';
  }

  const persistDraftDebounced = debounce(persistDraft, 250);

  const runtimeController = createRuntimeController({
    onStart: ({ runtime }) => {
      state.runCount += 1;
      resetOutputPanel('');
      setRuntimePrompt('');
      setRunningState(true);
      appendOutput(formatRunHeader(state.runCount, runtime));
      renderStatus(`Running with ${formatRuntimeLabel(runtime)}...`);
    },
    onStream: ({ text }) => {
      if (text.length > 0) {
        state.hadRunOutput = true;
      }
      appendOutput(text);
    },
    onDone: ({ runtime }) => {
      setRunningState(false);
      state.runtimeHint = runtime;
      if (runtime === 'full') {
        fullRuntimeMemo.add(state.source);
      }

      appendOutput('\n[completed]\n');
      renderStatus(`${formatRuntimeLabel(runtime)} run completed.`);

      if (state.hadRunOutput) {
        donationCta.hidden = false;
      }

      updateIssueLink();
      persistDraft();
    },
    onStopped: ({ runtime }) => {
      setRunningState(false);
      appendOutput(`\n[stopped ${formatRuntimeLabel(runtime).toLowerCase()}]\n`);
      renderStatus('Run stopped.');
    },
    onTimedOut: ({ runtime }) => {
      setRunningState(false);
      appendOutput(
        '\nError: Run time exceeded 10 seconds. Check your script for infinite loops.\n',
      );
      renderStatus(`${formatRuntimeLabel(runtime)} exceeded the 10-second limit.`);
    },
    onOutputLimit: ({ runtime }) => {
      setRunningState(false);
      output.textContent = truncateOutput(output.textContent, APP_CONFIG.maxOutputBytes);
      renderStatus(`${formatRuntimeLabel(runtime)} hit the output limit.`);
    },
    onError: ({ runtime, error }) => {
      setRunningState(false);
      appendOutput(`\n${formatErrorBlock(error)}`);

      const classification = classifyExecutionError({
        name: error?.name,
        message: error?.message,
        traceback: error?.stack,
      });

      if (classification.userMessage) {
        appendOutput(`${classification.userMessage}\n`);
      }

      if (runtime === 'fast' && classification.offerFullRuntime) {
        setRuntimePrompt('This script may need Full Python. Retry with Full Python?');
        renderStatus('Fast Python may be incompatible with this script.');
      } else {
        setRuntimePrompt('');
        renderStatus('Run failed.');
      }
    },
  });

  function applySource(source, nextExampleId) {
    state.source = source;
    state.exampleId = nextExampleId;
    state.runtimeHint = resolveRuntimeHint(source, nextExampleId);
    editor.value = source;
    updateIssueLink();
    persistDraftDebounced();
  }

  function runCurrentSource(forceRuntime = null) {
    const policyResult = validateSourcePolicy(state.source);

    donationCta.hidden = true;
    setRuntimePrompt('');

    if (!policyResult.ok) {
      resetOutputPanel('');
      state.runCount += 1;
      appendOutput(`\n=== Run ${state.runCount} · blocked ===\n${policyResult.message}\n`);
      renderStatus(policyResult.message);
      return;
    }

    runtimeController.run({
      source: state.source,
      runtime: chooseRuntime(forceRuntime),
    });
  }

  editor.value = state.source;
  editor.selectionStart = 0;
  editor.selectionEnd = 0;
  editor.scrollTop = 0;
  renderTheme();
  clearOutputPanel();
  renderStatus(initialState.warning ?? '');
  updateIssueLink();
  setRunningState(false);

  installTabBehavior(editor);
  installEditorSelectionBehavior(editor);
  installOutputSelectionBehavior(output);
  renderExampleList();

  loadExampleButton.addEventListener('click', () => {
    exampleSearch.value = '';
    renderExampleList();
    examplesDialog.showModal();
    exampleSearch.focus();
  });

  exampleSearch.addEventListener('input', () => {
    renderExampleList(exampleSearch.value);
  });

  copyShareLinkButton.addEventListener('click', async () => {
    const shareState = buildShareUrl({
      source: state.source,
      runtimeHint: state.runtimeHint,
      examples: EXAMPLES,
    });

    try {
      await copyText(shareState.url);
      renderStatus(
        shareState.isTooLong
          ? 'Copied a long share link.'
          : shareState.isExamplePermalink
            ? 'Copied a short link.'
            : 'Copied a share link.',
      );
    } catch {
      renderStatus('Could not copy the link automatically.');
    }
  });

  copyOutputButton.addEventListener('click', async () => {
    try {
      await copyText(output.textContent);
      renderStatus('Copied output.');
    } catch {
      renderStatus('Could not copy the output automatically.');
    }
  });

  clearOutputButton.addEventListener('click', () => {
    clearOutputPanel();
    renderStatus('Cleared output.');
  });

  runButton.addEventListener('click', () => {
    runCurrentSource();
  });

  retryFullRuntimeButton.addEventListener('click', () => {
    state.runtimeHint = 'full';
    runCurrentSource('full');
  });

  dismissRuntimePromptButton.addEventListener('click', () => {
    setRuntimePrompt('');
  });

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      state.themePreference = getNextThemePreference(
        state.themePreference,
        systemThemeQuery?.matches ?? false,
      );
      saveThemePreference(state.themePreference);
      renderTheme();
    });
  }

  editor.addEventListener('input', () => {
    state.source = editor.value;
    const matchingExample = findMatchingExampleBySource(state.source);
    state.exampleId = matchingExample?.id ?? null;
    state.runtimeHint = resolveRuntimeHint(state.source, state.exampleId);
    updateIssueLink();
    persistDraftDebounced();
  });

  window.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      if (!runtimeController.isRunning()) {
        runCurrentSource();
      }
    }
  });

  if (systemThemeQuery) {
    const handleThemeChange = () => {
      if (!state.themePreference) {
        renderTheme();
      }
    };

    if (typeof systemThemeQuery.addEventListener === 'function') {
      systemThemeQuery.addEventListener('change', handleThemeChange);
    } else if (typeof systemThemeQuery.addListener === 'function') {
      systemThemeQuery.addListener(handleThemeChange);
    }
  }

  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    editor.scrollTop = 0;
    output.scrollTop = 0;
    editor.focus({ preventScroll: true });
  });
}
