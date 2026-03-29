import { classifyExecutionError } from './classify.js';
import { APP_CONFIG, FOUNDATION_OUTPUT } from './config.js';
import {
  EXAMPLES,
  filterExamples,
  findMatchingExampleBySource,
  getExampleById,
} from './examples.js';
import { buildIssueUrl } from './issue.js';
import { truncateOutput } from './limits.js';
import { validateSourcePolicy } from './policy.js';
import { createRuntimeController } from './runtime.js';
import { buildShareUrl, parseShareFragment } from './share.js';
import { loadDraft, resolveInitialSource, saveDraft } from './storage.js';

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

function buildExampleCard(example, onLoad) {
  const article = document.createElement('article');
  article.className = 'example-card';
  article.setAttribute('role', 'listitem');

  const category = document.createElement('p');
  category.className = 'example-card__category';
  category.textContent = `${example.category} · ${example.runtime}`;

  const title = document.createElement('h3');
  title.className = 'example-card__title';
  title.textContent = example.title;

  const summary = document.createElement('p');
  summary.className = 'example-card__summary';
  summary.textContent = example.summary;

  const tags = document.createElement('p');
  tags.className = 'example-card__tags';
  tags.textContent = example.tags.map((tag) => `#${tag}`).join(' ');

  const action = document.createElement('button');
  action.className = 'button button--primary button--small';
  action.type = 'button';
  action.textContent = 'Load example';
  action.addEventListener('click', () => onLoad(example.id));

  article.append(category, title, summary, tags, action);
  return article;
}

function normalizeSource(sourceText) {
  return sourceText.replace(/\r\n/g, '\n');
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

export async function createApp() {
  const editor = document.querySelector('#editor');
  const output = document.querySelector('#output');
  const statusMessage = document.querySelector('#status-message');
  const shareSummary = document.querySelector('#share-summary');
  const editorOrigin = document.querySelector('#editor-origin');
  const examplesDialog = document.querySelector('#examples-dialog');
  const examplesList = document.querySelector('#examples-list');
  const exampleSearch = document.querySelector('#example-search');
  const exampleCount = document.querySelector('#example-count');
  const reportIssueLink = document.querySelector('#report-issue-link');
  const copyShareLinkButton = document.querySelector('#copy-share-link-button');
  const loadExampleButton = document.querySelector('#load-example-button');
  const clearOutputButton = document.querySelector('#clear-output-button');
  const runButton = document.querySelector('#run-button');
  const stopButton = document.querySelector('#stop-button');
  const donationCta = document.querySelector('#donation-cta');
  const runtimePrompt = document.querySelector('#runtime-prompt');
  const runtimePromptMessage = document.querySelector('#runtime-prompt-message');
  const retryFullRuntimeButton = document.querySelector('#retry-full-runtime-button');
  const dismissRuntimePromptButton = document.querySelector('#dismiss-runtime-prompt-button');

  const defaultExample = getExampleById(APP_CONFIG.defaultExampleId) ?? EXAMPLES[0];
  const fragmentState = parseShareFragment(window.location.hash, EXAMPLES);
  const localDraft = loadDraft();
  const initialState = resolveInitialSource({
    fragmentState,
    localDraft,
    defaultExample,
  });

  const fullRuntimeMemo = new Set();

  const state = {
    source: initialState.source,
    exampleId: initialState.exampleId,
    runtimeHint: initialState.runtimeHint ?? defaultExample.runtime ?? 'fast',
    runCount: 0,
    hadRunOutput: false,
  };

  function renderStatus(message) {
    statusMessage.textContent = message;
  }

  function renderShareSummary() {
    const matchingExample = findMatchingExampleBySource(state.source);
    if (matchingExample) {
      shareSummary.textContent = `Copy share link will use the short example permalink for ${matchingExample.title}.`;
      return;
    }

    const shareState = buildShareUrl({
      source: state.source,
      runtimeHint: state.runtimeHint,
      examples: EXAMPLES,
    });

    if (!shareState.isExamplePermalink && shareState.isTooLong) {
      shareSummary.textContent =
        'Copy share link will compress the current editor contents into the URL fragment. This link is long and may be unreliable to share.';
      return;
    }

    shareSummary.textContent =
      'Copy share link will compress the current editor contents into the URL fragment.';
  }

  function renderEditorOrigin(origin) {
    const activeExample = state.exampleId ? getExampleById(state.exampleId) : null;
    if (activeExample) {
      const isExactMatch = normalizeSource(activeExample.source) === normalizeSource(state.source);
      editorOrigin.textContent = isExactMatch
        ? `${origin} · ${activeExample.title}`
        : `${origin} · based on ${activeExample.title}`;
      return;
    }

    editorOrigin.textContent = origin;
  }

  function updateIssueLink() {
    const shareState = buildShareUrl({
      source: state.source,
      runtimeHint: state.runtimeHint,
      examples: EXAMPLES,
    });

    const example = state.exampleId ? getExampleById(state.exampleId) : null;
    const isCustomScript =
      !example || normalizeSource(example.source) !== normalizeSource(state.source);

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
    examplesList.replaceChildren(
      ...results.map((example) =>
        buildExampleCard(example, (exampleId) => {
          const nextExample = getExampleById(exampleId);
          applySource(nextExample.source, nextExample.id, 'example library');
          renderStatus(`Loaded ${nextExample.title}.`);
          examplesDialog.close();
        }),
      ),
    );

    exampleCount.textContent = `${results.length} example${results.length === 1 ? '' : 's'} available`;
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

  function clearOutputPanel() {
    output.textContent = FOUNDATION_OUTPUT;
    state.hadRunOutput = false;
    donationCta.hidden = true;
    setRuntimePrompt('');
  }

  function setRunningState(isRunning) {
    runButton.disabled = isRunning;
    stopButton.disabled = !isRunning;
  }

  function chooseRuntime(forceRuntime = null) {
    if (forceRuntime) {
      return forceRuntime;
    }

    if (state.runtimeHint === 'full' || fullRuntimeMemo.has(state.source)) {
      return 'full';
    }

    return 'fast';
  }

  const persistDraftDebounced = debounce(persistDraft, 250);

  const runtimeController = createRuntimeController({
    onStart: ({ runtime }) => {
      state.runCount += 1;
      state.hadRunOutput = false;
      donationCta.hidden = true;
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
        `\n[timed out after ${
          runtime === 'full' ? APP_CONFIG.fullTimeoutMs : APP_CONFIG.fastTimeoutMs
        } ms]\n`,
      );
      renderStatus(`${formatRuntimeLabel(runtime)} timed out.`);
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

  function applySource(source, nextExampleId, origin) {
    state.source = source;
    state.exampleId = nextExampleId;
    state.runtimeHint = nextExampleId
      ? getExampleById(nextExampleId)?.runtime ?? 'fast'
      : fullRuntimeMemo.has(source)
        ? 'full'
        : 'fast';
    editor.value = source;
    renderEditorOrigin(origin);
    renderShareSummary();
    updateIssueLink();
    persistDraftDebounced();
  }

  function runCurrentSource(forceRuntime = null) {
    const policyResult = validateSourcePolicy(state.source);

    donationCta.hidden = true;
    setRuntimePrompt('');

    if (!policyResult.ok) {
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
  clearOutputPanel();
  renderEditorOrigin(initialState.origin);
  renderStatus(initialState.warning ?? 'Shell ready. Editing, examples, and runtime controls are wired up.');
  renderShareSummary();
  updateIssueLink();
  setRunningState(false);

  installTabBehavior(editor);
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
          ? 'Copied a long share link. Trim comments or pasted data if it feels unreliable.'
          : shareState.isExamplePermalink
            ? 'Copied a short example permalink.'
            : 'Copied a prefilled share link.',
      );
    } catch {
      renderStatus('Could not copy the share link automatically. Copy it from the browser address bar instead.');
    }
  });

  clearOutputButton.addEventListener('click', () => {
    clearOutputPanel();
    renderStatus('Cleared the terminal panel.');
  });

  runButton.addEventListener('click', () => {
    runCurrentSource();
  });

  stopButton.addEventListener('click', () => {
    runtimeController.stop('user');
  });

  retryFullRuntimeButton.addEventListener('click', () => {
    state.runtimeHint = 'full';
    runCurrentSource('full');
  });

  dismissRuntimePromptButton.addEventListener('click', () => {
    setRuntimePrompt('');
  });

  editor.addEventListener('input', () => {
    state.source = editor.value;
    const matchingExample = findMatchingExampleBySource(state.source);
    state.exampleId = matchingExample?.id ?? null;
    state.runtimeHint = matchingExample?.runtime ?? (fullRuntimeMemo.has(state.source) ? 'full' : 'fast');
    renderEditorOrigin(matchingExample ? 'matching example' : 'custom draft');
    renderShareSummary();
    updateIssueLink();
    persistDraftDebounced();
  });

  window.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      if (!runtimeController.isRunning()) {
        runCurrentSource();
      }
      return;
    }

    if (event.key === 'Escape' && runtimeController.isRunning()) {
      event.preventDefault();
      runtimeController.stop('escape');
    }
  });

  editor.focus();
}
