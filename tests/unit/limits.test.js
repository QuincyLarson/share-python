import { describe, expect, it } from 'vitest';
import { getByteLength, isSourceWithinLimit, truncateOutput } from '../../src/limits.js';

describe('limit helpers', () => {
  it('uses utf-8 byte counts', () => {
    expect(getByteLength('plain ascii')).toBe(11);
    expect(getByteLength('cafe')).toBe(4);
  });

  it('checks source size using bytes rather than code units', () => {
    expect(isSourceWithinLimit('print("ok")', 32)).toBe(true);
    expect(isSourceWithinLimit('x'.repeat(70), 64)).toBe(false);
  });

  it('adds a visible sentinel when truncating oversized output', () => {
    const output = truncateOutput('x'.repeat(80), 40);
    expect(output).toMatch(/output truncated/i);
  });
});
