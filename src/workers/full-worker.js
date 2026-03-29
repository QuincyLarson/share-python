import { loadPyodide } from 'pyodide';

let runtimePromise = null;

function serializeError(error) {
  return {
    name: error?.name ?? 'Error',
    message: error?.message ?? String(error),
    stack: error?.stack ?? '',
    type: error?.type ?? null,
  };
}

function blockNetwork() {
  const originalFetch = globalThis.fetch;
  const originalWebSocket = globalThis.WebSocket;
  const originalXMLHttpRequest = globalThis.XMLHttpRequest;
  const blocked = () => {
    throw new Error('Network access is disabled in this runner.');
  };

  globalThis.fetch = blocked;
  globalThis.WebSocket = class {
    constructor() {
      blocked();
    }
  };
  globalThis.XMLHttpRequest = class {
    constructor() {
      blocked();
    }
  };

  return () => {
    globalThis.fetch = originalFetch;
    globalThis.WebSocket = originalWebSocket;
    globalThis.XMLHttpRequest = originalXMLHttpRequest;
  };
}

async function getRuntime() {
  if (!runtimePromise) {
    runtimePromise = loadPyodide({
      indexURL: new URL('../runtimes/full/', import.meta.url).toString(),
    }).then((pyodide) => {
      pyodide.setStdout({
        batched: (text) => {
          postMessage({ type: 'stdout', runtime: 'full', text });
        },
      });
      pyodide.setStderr({
        batched: (text) => {
          postMessage({ type: 'stderr', runtime: 'full', text });
        },
      });
      pyodide.setStdin({
        stdin: () => {
          throw new Error(
            'Interactive input is not supported in v1. Edit variables directly in the script instead.',
          );
        },
      });
      return pyodide;
    });
  }

  return runtimePromise;
}

self.addEventListener('message', async (event) => {
  if (event.data?.type !== 'run') {
    return;
  }

  try {
    const pyodide = await getRuntime();
    const restoreNetwork = blockNetwork();

    try {
      await pyodide.runPythonAsync(event.data.source);
      postMessage({ type: 'done', runtime: 'full' });
    } finally {
      restoreNetwork();
    }
  } catch (error) {
    postMessage({
      type: 'error',
      runtime: 'full',
      error: serializeError(error),
    });
  }
});

