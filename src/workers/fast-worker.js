import { loadMicroPython } from '@micropython/micropython-webassembly-pyscript';

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
    runtimePromise = loadMicroPython({
      url: new URL('../runtimes/fast/micropython.wasm', import.meta.url).toString(),
      linebuffer: true,
      stdin: () => {
        throw new Error(
          'Interactive input is not supported in v1. Edit variables directly in the script instead.',
        );
      },
      stdout: (text) => {
        postMessage({ type: 'stdout', runtime: 'fast', text });
      },
      stderr: (text) => {
        postMessage({ type: 'stderr', runtime: 'fast', text });
      },
    });
  }

  return runtimePromise;
}

self.addEventListener('message', async (event) => {
  if (event.data?.type !== 'run') {
    return;
  }

  try {
    const runtime = await getRuntime();
    const restoreNetwork = blockNetwork();

    try {
      await Promise.resolve(runtime.runPythonAsync(event.data.source));
      postMessage({ type: 'done', runtime: 'fast' });
    } finally {
      restoreNetwork();
    }
  } catch (error) {
    postMessage({
      type: 'error',
      runtime: 'fast',
      error: serializeError(error),
    });
  }
});
