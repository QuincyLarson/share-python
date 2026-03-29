import test from 'node:test';
import assert from 'node:assert/strict';

import { classifyRuntimeFailure } from '../../src/classify.js';

test('module import failures offer the full runtime retry path', () => {
  const result = classifyRuntimeFailure({
    name: 'ModuleNotFoundError',
    message: "No module named 'zoneinfo'"
  });

  assert.equal(result.shouldOfferFullRuntime, true);
  assert.equal(result.reason, 'runtime_incompatibility');
});

test('ordinary syntax mistakes do not trigger full runtime retry', () => {
  const result = classifyRuntimeFailure({
    name: 'SyntaxError',
    message: 'invalid syntax'
  });

  assert.equal(result.shouldOfferFullRuntime, false);
  assert.equal(result.reason, 'ordinary_bug');
});

test('disallowed network/package cases stay blocked', () => {
  const result = classifyRuntimeFailure({
    message: 'requests is not available in this environment'
  });

  assert.equal(result.shouldOfferFullRuntime, false);
  assert.equal(result.reason, 'disallowed_capability');
});

