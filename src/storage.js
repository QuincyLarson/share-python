import { APP_CONFIG } from './config.js';

export function loadDraft(storage = globalThis.localStorage) {
  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(APP_CONFIG.storageKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return typeof parsed?.source === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft, storage = globalThis.localStorage) {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(APP_CONFIG.storageKey, JSON.stringify(draft));
  } catch {
    // Storage failures should not block editing.
  }
}

export function resolveInitialSource({ fragmentState, localDraft, defaultExample }) {
  const fragmentRuntimeHint = fragmentState?.runtimeHint ?? null;

  if (fragmentState?.source) {
    return {
      source: fragmentState.source,
      exampleId: fragmentState.exampleId ?? null,
      runtimeHint: fragmentRuntimeHint,
      origin: fragmentState.exampleId ? 'shared example' : 'shared code',
      warning: fragmentState.error ?? null,
    };
  }

  if (fragmentState?.error) {
    return {
      source: defaultExample.source,
      exampleId: defaultExample.id,
      runtimeHint: fragmentRuntimeHint ?? defaultExample.runtime,
      origin: 'starter example',
      warning: fragmentState.error,
    };
  }

  if (defaultExample?.routeSlug) {
    return {
      source: defaultExample.source,
      exampleId: defaultExample.id,
      runtimeHint: fragmentRuntimeHint ?? defaultExample.runtime,
      origin: 'route example',
      warning: null,
    };
  }

  if (localDraft?.source) {
    return {
      source: localDraft.source,
      exampleId: localDraft.exampleId ?? null,
      runtimeHint: fragmentRuntimeHint ?? localDraft.runtimeHint ?? null,
      origin: 'local draft',
      warning: null,
    };
  }

  return {
    source: defaultExample.source,
    exampleId: defaultExample.id,
    runtimeHint: fragmentRuntimeHint ?? defaultExample.runtime,
    origin: 'starter example',
    warning: null,
  };
}
