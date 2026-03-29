import { describe, expect, it } from 'vitest';
import { EXAMPLES } from '../../src/examples.js';
import { buildShareFragment, parseShareFragment } from '../../src/share.js';

describe('share helpers', () => {
  it('uses an example permalink when the editor matches a curated example exactly', () => {
    const result = buildShareFragment({
      source: EXAMPLES[0].source,
      runtimeHint: 'fast',
      examples: EXAMPLES,
    });

    expect(result.fragment).toBe(`ex=${EXAMPLES[0].id}`);
    expect(result.isExamplePermalink).toBe(true);
    expect(result.isTooLong).toBe(false);
  });

  it('round-trips a custom code payload through the fragment codec', () => {
    const source = 'print("hello from custom code")\n';
    const shareState = buildShareFragment({
      source,
      runtimeHint: 'full',
      examples: EXAMPLES,
    });

    const parsed = parseShareFragment(`#${shareState.fragment}`, EXAMPLES);
    expect(parsed).toEqual({
      source,
      exampleId: null,
      runtimeHint: 'full',
      error: null,
    });
  });

  it('surfaces a friendly error when a share link cannot be decoded', () => {
    const parsed = parseShareFragment('#v=1&code=not-real', EXAMPLES);
    expect(parsed.error).toMatch(/could not be decoded/i);
    expect(parsed.source).toBeNull();
  });
});
