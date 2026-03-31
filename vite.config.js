import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import { EXAMPLE_ROUTE_PREFIXES } from './src/example-routes.js';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const routePagesRoots = EXAMPLE_ROUTE_PREFIXES.map((routePrefix) =>
  path.resolve(repoRoot, routePrefix),
);

function collectHtmlInputs(directoryPath) {
  if (!existsSync(directoryPath)) {
    return {};
  }

  const entries = {};
  const pending = [directoryPath];

  while (pending.length > 0) {
    const currentDirectory = pending.pop();
    const children = readdirSync(currentDirectory, { withFileTypes: true });

    for (const child of children) {
      const absoluteChildPath = path.join(currentDirectory, child.name);

      if (child.isDirectory()) {
        pending.push(absoluteChildPath);
        continue;
      }

      if (!child.isFile() || child.name !== 'index.html') {
        continue;
      }

      const relativePath = path.relative(repoRoot, absoluteChildPath);
      const entryName = relativePath.replaceAll(path.sep, '-').replace(/\.html$/, '');
      entries[entryName] = absoluteChildPath;
    }
  }

  return entries;
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        app: path.resolve(repoRoot, 'index.html'),
        ...routePagesRoots.reduce(
          (entries, routePagesRoot) => ({
            ...entries,
            ...collectHtmlInputs(routePagesRoot),
          }),
          {},
        ),
      },
    },
  },
  test: {
    include: ['tests/unit/**/*.test.js'],
  },
  worker: {
    format: 'es',
  },
  server: {
    host: '127.0.0.1',
    port: 4173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
