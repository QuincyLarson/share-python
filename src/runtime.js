import { APP_CONFIG } from './config.js';
import { getAppBasePath } from './example-routes.js';
import { getByteLength } from './limits.js';
import FastWorker from './workers/fast-worker.js?worker';
import FullWorker from './workers/full-worker.js?worker';

const workerConstructors = {
  fast: FastWorker,
  full: FullWorker,
};

function buildRuntimeAssets(pageUrl = window.location.href) {
  const currentUrl = new URL(pageUrl);
  const appBaseUrl = new URL(getAppBasePath(currentUrl.pathname), currentUrl.origin);

  return {
    fastWasmUrl: new URL('runtimes/fast/micropython.wasm', appBaseUrl).toString(),
    fullIndexUrl: new URL('runtimes/full/', appBaseUrl).toString(),
  };
}

export function createRuntimeController(handlers) {
  let currentRun = null;

  function clearCurrentRun() {
    if (!currentRun) {
      return;
    }

    window.clearTimeout(currentRun.timeoutId);
    currentRun = null;
  }

  return {
    run({ source, runtime }) {
      this.stop('replaced');

      const WorkerConstructor = workerConstructors[runtime];
      const worker = new WorkerConstructor();
      const timeoutId = window.setTimeout(() => {
        worker.terminate();
        clearCurrentRun();
        handlers.onTimedOut?.({ runtime });
      }, runtime === 'full' ? APP_CONFIG.fullTimeoutMs : APP_CONFIG.fastTimeoutMs);

      currentRun = {
        worker,
        timeoutId,
        runtime,
        outputBytes: 0,
      };

      handlers.onStart?.({ runtime });

      worker.addEventListener('message', (event) => {
        if (!currentRun || currentRun.worker !== worker) {
          return;
        }

        const message = event.data;

        if (message.type === 'stdout' || message.type === 'stderr') {
          const nextSize = currentRun.outputBytes + getByteLength(message.text);
          if (nextSize > APP_CONFIG.maxOutputBytes) {
            worker.terminate();
            clearCurrentRun();
            handlers.onOutputLimit?.({ runtime });
            return;
          }

          currentRun.outputBytes = nextSize;
          handlers.onStream?.(message);
          return;
        }

        if (message.type === 'done') {
          clearCurrentRun();
          handlers.onDone?.(message);
          return;
        }

        if (message.type === 'error') {
          clearCurrentRun();
          handlers.onError?.(message);
        }
      });

      worker.addEventListener('error', (event) => {
        if (!currentRun || currentRun.worker !== worker) {
          return;
        }

        clearCurrentRun();
        handlers.onError?.({
          type: 'error',
          runtime,
          error: {
            name: 'WorkerError',
            message: event.message,
            stack: event.error?.stack ?? '',
          },
        });
      });

      worker.postMessage({
        type: 'run',
        source,
        assets: buildRuntimeAssets(),
      });
    },

    stop(reason = 'stopped') {
      if (!currentRun) {
        return false;
      }

      const { worker, runtime } = currentRun;
      worker.terminate();
      clearCurrentRun();
      handlers.onStopped?.({ runtime, reason });
      return true;
    },

    isRunning() {
      return currentRun !== null;
    },
  };
}
