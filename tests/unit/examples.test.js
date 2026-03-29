import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import os from 'node:os';
import { mkdtemp } from 'node:fs/promises';

import { buildExamplesManifest } from '../../scripts/build-examples.mjs';

test('example manifest generation embeds script contents and validates metadata', async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'share-python-examples-'));
  const manifest = await buildExamplesManifest({
    outputPath: path.join(tempDir, 'examples-manifest.js')
  });

  assert.equal(manifest.length, 6);
  assert.equal(manifest[0].id, 'mortgage-payment');
  assert.match(manifest[0].script, /Mortgage payment calculator/);
  assert.ok(manifest.every((example) => Array.isArray(example.checks) && example.checks.length > 0));
});
