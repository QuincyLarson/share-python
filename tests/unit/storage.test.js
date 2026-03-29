import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveInitialSource } from '../../src/storage.js';

const examples = new Map([
  [
    'mortgage-payment',
    {
      id: 'mortgage-payment',
      title: 'Mortgage payment calculator',
      runtime: 'fast',
      script: 'print("mortgage")'
    }
  ]
]);

test('shared examples take precedence over local drafts', () => {
  const result = resolveInitialSource({
    fragmentState: { type: 'example', exampleId: 'mortgage-payment' },
    draftSource: 'print("draft")',
    defaultSource: 'print("default")',
    findExampleById: (exampleId) => examples.get(exampleId) ?? null
  });

  assert.equal(result.sourceText, 'print("mortgage")');
  assert.equal(result.activeExampleId, 'mortgage-payment');
  assert.equal(result.runtimeHint, 'fast');
});

test('decoded code payloads take precedence over local drafts', () => {
  const result = resolveInitialSource({
    fragmentState: {
      type: 'code',
      sourceText: 'print("shared")',
      runtimeHint: 'full'
    },
    draftSource: 'print("draft")',
    defaultSource: 'print("default")',
    findExampleById: () => null
  });

  assert.equal(result.sourceText, 'print("shared")');
  assert.equal(result.runtimeHint, 'full');
});

test('local drafts beat the default script when there is no fragment', () => {
  const result = resolveInitialSource({
    fragmentState: { type: 'empty' },
    draftSource: 'print("draft")',
    defaultSource: 'print("default")',
    findExampleById: () => null
  });

  assert.equal(result.sourceText, 'print("draft")');
  assert.match(result.statusText, /Restored your last local draft/i);
});

