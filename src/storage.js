export function createDraftStorage(storage, key) {
  return {
    load() {
      try {
        return storage?.getItem(key) ?? '';
      } catch {
        return '';
      }
    },
    save(sourceText) {
      try {
        storage?.setItem(key, sourceText);
      } catch {
        // localStorage may be unavailable in private browsing or strict privacy modes.
      }
    },
    clear() {
      try {
        storage?.removeItem(key);
      } catch {
        // Nothing else to do when storage is unavailable.
      }
    }
  };
}

export function resolveInitialSource({
  fragmentState,
  draftSource,
  defaultSource,
  findExampleById
}) {
  if (fragmentState?.type === 'example') {
    const example = findExampleById(fragmentState.exampleId);

    if (example) {
      return {
        sourceText: example.script,
        activeExampleId: example.id,
        runtimeHint: fragmentState.runtimeHint ?? example.runtime ?? null,
        statusText: `Loaded shared example: ${example.title}.`
      };
    }

    return {
      sourceText: draftSource || defaultSource,
      activeExampleId: null,
      runtimeHint: null,
      statusText: draftSource
        ? 'Shared example was not found. Restored your local draft instead.'
        : 'Shared example was not found. Loaded the starter script instead.'
    };
  }

  if (fragmentState?.type === 'code') {
    return {
      sourceText: fragmentState.sourceText,
      activeExampleId: null,
      runtimeHint: fragmentState.runtimeHint ?? null,
      statusText: 'Loaded code from the shared link. It will not run until you click Run.'
    };
  }

  if (fragmentState?.type === 'error') {
    return {
      sourceText: draftSource || defaultSource,
      activeExampleId: null,
      runtimeHint: null,
      statusText: draftSource
        ? 'The shared link could not be decoded. Restored your local draft instead.'
        : 'The shared link could not be decoded. Loaded the starter script instead.'
    };
  }

  if (draftSource) {
    return {
      sourceText: draftSource,
      activeExampleId: null,
      runtimeHint: null,
      statusText: 'Restored your last local draft.'
    };
  }

  return {
    sourceText: defaultSource,
    activeExampleId: null,
    runtimeHint: null,
    statusText: 'Loaded the starter script.'
  };
}
