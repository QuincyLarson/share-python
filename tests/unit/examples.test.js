import { describe, expect, it } from 'vitest';
import { EXAMPLES, validateExampleManifest } from '../../src/examples.js';

describe('example manifest', () => {
  it('keeps the current starter examples well formed', () => {
    const validation = validateExampleManifest(EXAMPLES);

    for (const entry of validation) {
      expect(entry.missing).toEqual([]);
      expect(entry.hasHeaderComment).toBe(true);
    }
  });
});
