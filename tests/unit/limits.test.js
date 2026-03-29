import test from 'node:test';
import assert from 'node:assert/strict';

import { getByteLength, isSourceWithinLimit, truncateOutput } from '../../src/limits.js';

test('byte length uses utf-8 semantics', () => {
  assert.equal(getByteLength('plain ascii'), 11);
  assert.equal(getByteLength('cafe'), 4);
});

test('source length checks use byte count rather than code units', () => {
  assert.equal(isSourceWithinLimit('print("ok")', 32), true);
  assert.equal(isSourceWithinLimit('x'.repeat(70), 64), false);
});

test('output truncation preserves a visible sentinel', () => {
  const output = truncateOutput('x'.repeat(80), 40);
  assert.match(output, /output truncated/i);
});

