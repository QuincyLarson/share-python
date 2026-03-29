import { appConfig } from './config.js';
import { createStore } from './state.js';

const shellActions = {
  run: 'Execution lands in the next slice.',
  stop: 'Worker termination lands with the runtime slice.',
  examples: 'Example browsing lands with the manifest slice.',
  share: 'Share-link generation lands with the state slice.'
};

export function createApp(root) {
  const store = createStore({
    outputText: appConfig.outputPlaceholder,
    statusText: 'Shell ready. Runtime wiring is not in this commit.'
  });

  root.innerHTML = `
    <main class="shell">
      <section class="hero" aria-labelledby="app-title">
        <p class="eyebrow">${appConfig.eyebrow}</p>
        <div class="hero-row">
          <div>
            <h1 id="app-title">${appConfig.title}</h1>
            <p class="intro">${appConfig.intro}</p>
          </div>
          <aside class="status-card" aria-label="Implementation status">
            <span class="status-label">Current slice</span>
            <strong>App shell and layout</strong>
            <p>Execution, share links, examples, and deploy wiring are the next atomic commits.</p>
          </aside>
        </div>
      </section>

      <section class="workspace" aria-label="Python runner">
        <header class="toolbar">
          <div class="toolbar-group" role="group" aria-label="Runner controls">
            <button type="button" data-action="run">Run</button>
            <button type="button" data-action="stop" class="ghost">Stop</button>
            <button type="button" data-action="clear" class="ghost">Clear output</button>
          </div>
          <div class="toolbar-group" role="group" aria-label="Script controls">
            <button type="button" data-action="examples" class="ghost">Load example</button>
            <button type="button" data-action="share" class="ghost">Copy share link</button>
            <a
              class="ghost toolbar-link"
              href="https://github.com/freeCodeCamp/freeCodeCamp/issues/new/choose"
              target="_blank"
              rel="noreferrer"
            >
              Report issue
            </a>
          </div>
        </header>

        <div class="panes">
          <section class="pane" aria-labelledby="editor-heading">
            <div class="pane-header">
              <h2 id="editor-heading">Editor</h2>
              <span class="pane-meta">Plain text Python</span>
            </div>
            <label class="sr-only" for="editor">Python script editor</label>
            <textarea
              id="editor"
              class="editor"
              spellcheck="false"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
            ></textarea>
          </section>

          <section class="pane" aria-labelledby="output-heading">
            <div class="pane-header">
              <h2 id="output-heading">Output</h2>
              <span class="pane-meta">Terminal-style text</span>
            </div>
            <pre class="output" data-output></pre>
          </section>
        </div>
      </section>

      <footer class="footer">
        <p>${appConfig.footerNote}</p>
        <p class="status-line" role="status" aria-live="polite" data-status></p>
      </footer>
    </main>
  `;

  const editor = root.querySelector('#editor');
  const output = root.querySelector('[data-output]');
  const status = root.querySelector('[data-status]');

  editor.value = appConfig.defaultScript;

  store.subscribe((state) => {
    output.textContent = state.outputText;
    status.textContent = state.statusText;
  });

  root.querySelector('[data-action="clear"]').addEventListener('click', () => {
    store.setState({
      outputText: '',
      statusText: 'Output cleared.'
    });
  });

  for (const [action, message] of Object.entries(shellActions)) {
    const button = root.querySelector(`[data-action="${action}"]`);

    button.addEventListener('click', () => {
      store.setState({
        statusText: message
      });
    });
  }
}
