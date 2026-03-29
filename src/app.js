import { APP_CONFIG, FOUNDATION_OUTPUT } from './config.js';
import {
  EXAMPLES,
  filterExamples,
  findExampleById,
  findMatchingExampleBySource,
} from './examples.js';
import { buildIssueUrl } from './issue.js';
import {
  decodeShareFragment,
  encodeShareFragment,
  isShareUrlTooLong,
} from './share.js';
import { createDraftStorage, resolveInitialSource } from './storage.js';

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

function buildShareUrl(fragment) {
  const shareUrl = new URL(window.location.href);
  shareUrl.hash = fragment.startsWith('#') ? fragment.slice(1) : fragment;
  return shareUrl.toString();
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

  const draftStorage = createDraftStorage(window.localStorage, APP_CONFIG.storageKey);
  const defaultExample = findExampleById(APP_CONFIG.defaultExampleId) ?? EXAMPLES[0];
  const fragmentState = await decodeShareFragment(window.location.hash);
  const localDraft = draftStorage.load();
  const initialState = resolveInitialSource({
    fragmentState,
    draftSource: localDraft,
    defaultSource: defaultExample?.script ?? '',
    findExampleById,
  });

  const state = {
    source: initialState.sourceText,
    activeExampleId:
      initialState.activeExampleId ??
      findMatchingExampleBySource(initialState.sourceText)?.id ??
      null,
    runtimeHint: initialState.runtimeHint ?? defaultExample?.runtime ?? 'fast',
    shareUrl: window.location.href,
    issueUrl: reportIssueLink.href,
  };
  let shareRefreshToken = 0;

  function renderOutput() {
    output.textContent = FOUNDATION_OUTPUT;
  }

  function renderStatus(message) {
    statusMessage.textContent = message;
  }

  function renderShareSummary() {
    const matchingExample = findMatchingExampleBySource(state.source);
    if (matchingExample) {
      shareSummary.textContent = `Copy share link will use the short example permalink for ${matchingExample.title}.`;
      return;
    }

    shareSummary.textContent =
      'Copy share link will compress the current editor contents into the URL fragment.';
  }

  function renderEditorOrigin(origin) {
    const activeExample = state.activeExampleId ? findExampleById(state.activeExampleId) : null;
    const matchingExample = findMatchingExampleBySource(state.source);
    const example = activeExample ?? matchingExample;

    if (example) {
      const isExactMatch = normalizeSource(example.script) === normalizeSource(state.source);
      editorOrigin.textContent = isExactMatch
        ? `${origin} · ${example.title}`
        : `${origin} · based on ${example.title}`;
      return;
    }

    editorOrigin.textContent = origin;
  }

  async function refreshDerivedLinks() {
    const refreshId = ++shareRefreshToken;
    const matchingExample = findMatchingExampleBySource(state.source);
    const fragment = await encodeShareFragment({
      sourceText: state.source,
      exampleId: matchingExample?.id ?? null,
      runtimeHint: state.runtimeHint,
    });
    const shareUrl = buildShareUrl(fragment);
    const activeExample = state.activeExampleId ? findExampleById(state.activeExampleId) : null;
    const isCustomScript =
      !activeExample || normalizeSource(activeExample.script) !== normalizeSource(state.source);
    const issueUrl = buildIssueUrl({
      currentUrl: shareUrl,
      example: activeExample,
      runtimeHint: state.runtimeHint,
      isCustomScript,
    });

    if (refreshId !== shareRefreshToken) {
      return;
    }

    state.shareUrl = shareUrl;
    state.issueUrl = issueUrl;
    reportIssueLink.href = issueUrl;

    if (!matchingExample && isShareUrlTooLong(shareUrl, APP_CONFIG.maxShareUrlLength)) {
      shareSummary.textContent =
        'Copy share link will compress the current editor contents into the URL fragment. This link is long and may be unreliable to share.';
      return;
    }

    renderShareSummary();
  }

  function persistDraft() {
    draftStorage.save(state.source);
  }

  const persistDraftDebounced = debounce(persistDraft, 250);

  async function applySource(source, nextExampleId, origin) {
    state.source = source;
    state.activeExampleId = nextExampleId;
    state.runtimeHint = nextExampleId ? findExampleById(nextExampleId)?.runtime ?? 'fast' : 'fast';
    editor.value = source;
    renderEditorOrigin(origin);
    await refreshDerivedLinks();
    persistDraftDebounced();
  }

  function renderExampleList(query = '') {
    const results = filterExamples(query);
    examplesList.replaceChildren(
      ...results.map((example) =>
        buildExampleCard(example, (exampleId) => {
          const nextExample = findExampleById(exampleId);
          applySource(nextExample.script, nextExample.id, 'example library');
          renderStatus(`Loaded ${nextExample.title}.`);
          examplesDialog.close();
        }),
      ),
    );

    exampleCount.textContent = `${results.length} example${results.length === 1 ? '' : 's'} available`;
  }

  editor.value = state.source;
  renderOutput();
  renderEditorOrigin('loaded');
  renderStatus(initialState.statusText);
  await refreshDerivedLinks();

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
    try {
      await refreshDerivedLinks();
      const matchingExample = findMatchingExampleBySource(state.source);
      await copyText(state.shareUrl);
      renderStatus(
        !matchingExample && isShareUrlTooLong(state.shareUrl, APP_CONFIG.maxShareUrlLength)
          ? 'Copied a long share link. Trim comments or pasted data if it feels unreliable.'
          : matchingExample
            ? 'Copied a short example permalink.'
            : 'Copied a prefilled share link.',
      );
    } catch {
      renderStatus('Could not copy the share link automatically. Copy it from the browser address bar instead.');
    }
  });

  clearOutputButton.addEventListener('click', () => {
    renderOutput();
    renderStatus('Cleared the terminal panel.');
  });

  editor.addEventListener('input', () => {
    state.source = editor.value;
    const matchingExample = findMatchingExampleBySource(state.source);
    state.runtimeHint = matchingExample?.runtime ?? state.runtimeHint ?? 'fast';
    renderEditorOrigin(matchingExample ? 'matching example' : 'custom draft');
    void refreshDerivedLinks();
    persistDraftDebounced();
  });

  editor.focus();
}
