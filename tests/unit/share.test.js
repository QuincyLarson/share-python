import test from 'node:test';
import assert from 'node:assert/strict';

import { decodeShareFragment, encodeShareFragment, isShareUrlTooLong } from '../../src/share.js';

test('code payload share fragments round-trip', async () => {
  const sourceText = 'print("hello from a shared script")\n';
  const fragment = await encodeShareFragment({
    sourceText,
    runtimeHint: 'full'
  });

  const decoded = await decodeShareFragment(fragment);

  assert.equal(decoded.type, 'code');
  assert.equal(decoded.sourceText, sourceText);
  assert.equal(decoded.runtimeHint, 'full');
});

test('example share fragments decode without embedding script text', async () => {
  const fragment = await encodeShareFragment({
    sourceText: '',
    exampleId: 'mortgage-payment',
    runtimeHint: 'fast'
  });

  const decoded = await decodeShareFragment(fragment);

  assert.deepEqual(decoded, {
    type: 'example',
    exampleId: 'mortgage-payment',
    runtimeHint: 'fast'
  });
});

test('share URL length warnings trigger above the configured threshold', () => {
  assert.equal(isShareUrlTooLong('https://example.com/#short', 50), false);
  assert.equal(isShareUrlTooLong('https://example.com/#this-link-is-definitely-too-long', 20), true);
});

