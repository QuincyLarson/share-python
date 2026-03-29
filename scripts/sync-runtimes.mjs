import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const copies = [
  {
    from: path.join(
      repoRoot,
      'node_modules',
      '@micropython',
      'micropython-webassembly-pyscript',
      'micropython.wasm',
    ),
    to: path.join(repoRoot, 'public', 'runtimes', 'fast', 'micropython.wasm'),
  },
  {
    from: path.join(repoRoot, 'node_modules', 'pyodide', 'pyodide.asm.js'),
    to: path.join(repoRoot, 'public', 'runtimes', 'full', 'pyodide.asm.js'),
  },
  {
    from: path.join(repoRoot, 'node_modules', 'pyodide', 'pyodide.asm.wasm'),
    to: path.join(repoRoot, 'public', 'runtimes', 'full', 'pyodide.asm.wasm'),
  },
  {
    from: path.join(repoRoot, 'node_modules', 'pyodide', 'python_stdlib.zip'),
    to: path.join(repoRoot, 'public', 'runtimes', 'full', 'python_stdlib.zip'),
  },
  {
    from: path.join(repoRoot, 'node_modules', 'pyodide', 'pyodide-lock.json'),
    to: path.join(repoRoot, 'public', 'runtimes', 'full', 'pyodide-lock.json'),
  },
];

for (const file of copies) {
  await mkdir(path.dirname(file.to), { recursive: true });
  await copyFile(file.from, file.to);
}

console.log(`Synced ${copies.length} runtime assets into public/runtimes.`);

