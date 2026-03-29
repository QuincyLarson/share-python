import { describe, expect, it } from 'vitest';
import {
  classifyExecutionError,
  detectBlockedModuleImport,
  detectUnsupportedInput,
} from '../../src/classify.js';

describe('runtime classification', () => {
  it('flags input usage as unsupported in v1', () => {
    expect(detectUnsupportedInput('name = input("What is your name? ")')).toBe(true);
  });

  it('finds obviously blocked modules in a static scan', () => {
    expect(detectBlockedModuleImport('import requests\nprint("hi")')).toBe('requests');
  });

  it('offers full runtime for likely missing standard-library modules', () => {
    const result = classifyExecutionError({
      name: 'ModuleNotFoundError',
      message: "No module named 'zoneinfo'",
    });

    expect(result.offerFullRuntime).toBe(true);
    expect(result.kind).toBe('missing-module');
  });

  it('does not offer full runtime for ordinary syntax mistakes', () => {
    const result = classifyExecutionError({
      name: 'SyntaxError',
      message: 'invalid syntax',
    });

    expect(result.offerFullRuntime).toBe(false);
    expect(result.kind).toBe('user-code-error');
  });

  it('does not offer full runtime for an ordinary KeyError', () => {
    const result = classifyExecutionError({
      name: 'KeyError',
      message: "'missing_key'",
    });

    expect(result.offerFullRuntime).toBe(false);
    expect(result.kind).toBe('user-code-error');
  });
});
