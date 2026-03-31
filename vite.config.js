import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const routePagesRoot = path.resolve(repoRoot, 'financial-calculators');

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
        ...collectHtmlInputs(routePagesRoot),
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
