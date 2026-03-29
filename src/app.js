import { APP_CONFIG, FOUNDATION_OUTPUT } from './config.js';
import { getExampleById, EXAMPLES } from './examples.js';
import { buildIssueUrl } from './issue.js';
import { buildShareUrl, findMatchingExample, parseShareFragment } from './share.js';
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

function filterExamples(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return EXAMPLES;
  }

  return EXAMPLES.filter((example) => {
    const haystack = [
      example.title,
      example.category,
      example.summary,
      example.description,
      ...example.tags,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

function normalizeSource(source) {
  return source.replace(/\r\n/g, '\n');
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

export function createApp() {
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

  const defaultExample = getExampleById(APP_CONFIG.defaultExampleId) ?? EXAMPLES[0];
  const fragmentState = parseShareFragment(window.location.hash, EXAMPLES);
  const localDraft = loadDraft();
  const initialState = resolveInitialSource({
    fragmentState,
    localDraft,
    defaultExample,
  });

  const state = {
    source: initialState.source,
    exampleId: initialState.exampleId,
    runtimeHint: initialState.runtimeHint,
  };

  function renderOutput() {
    output.textContent = FOUNDATION_OUTPUT;
  }

  function renderStatus(message) {
    statusMessage.textContent = message;
  }

  function renderShareSummary() {
    const matchingExample = findMatchingExample(state.source, EXAMPLES);
    if (matchingExample) {
      shareSummary.textContent = `Copy share link will use the short example permalink for ${matchingExample.title}.`;
      return;
    }

    shareSummary.textContent =
      'Copy share link will compress the current editor contents into the URL fragment.';
  }

  function renderEditorOrigin(origin) {
    const matchingExample = state.exampleId ? getExampleById(state.exampleId) : null;
    if (matchingExample) {
      editorOrigin.textContent = `${origin} · ${matchingExample.title}`;
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

    const example = getExampleById(state.exampleId);
    const isCustomScript = !example || normalizeSource(example.source) !== normalizeSource(state.source);

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

  const persistDraftDebounced = debounce(persistDraft, 250);

  function applySource(source, nextExampleId, origin) {
    state.source = source;
    state.exampleId = nextExampleId;
    state.runtimeHint = nextExampleId ? getExampleById(nextExampleId)?.runtime ?? 'fast' : 'fast';
    editor.value = source;
    renderEditorOrigin(origin);
    renderShareSummary();
    updateIssueLink();
    persistDraftDebounced();
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

  editor.value = state.source;
  renderOutput();
  renderShareSummary();
  renderEditorOrigin(initialState.origin);
  updateIssueLink();

  if (initialState.warning) {
    renderStatus(initialState.warning);
  }

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

    await copyText(shareState.url);
    renderStatus(
      shareState.isTooLong
        ? 'Copied a long share link. Trim comments or pasted data if it feels unreliable.'
        : shareState.isExamplePermalink
          ? 'Copied a short example permalink.'
          : 'Copied a prefilled share link.',
    );
  });

  clearOutputButton.addEventListener('click', () => {
    renderOutput();
    renderStatus('Cleared the terminal panel.');
  });

  editor.addEventListener('input', () => {
    state.source = editor.value;
    const matchingExample = findMatchingExample(state.source, EXAMPLES);
    state.exampleId = matchingExample?.id ?? null;
    state.runtimeHint = matchingExample?.runtime ?? state.runtimeHint ?? 'fast';
    renderEditorOrigin(matchingExample ? 'matching example' : 'custom draft');
    renderShareSummary();
    updateIssueLink();
    persistDraftDebounced();
  });
}
