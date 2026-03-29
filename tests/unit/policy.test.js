import { describe, expect, it } from 'vitest';

import { validateSourcePolicy } from '../../src/policy.js';

describe('source policy', () => {
  it('blocks interactive input for MVP', () => {
    const result = validateSourcePolicy('name = input("Name? ")');
    expect(result.ok).toBe(false);
    expect(result.code).toBe('interactive_input');
  });

  it('blocks package installation flows', () => {
    const result = validateSourcePolicy('import micropip\nawait micropip.install("pandas")');
    expect(result.ok).toBe(false);
    expect(result.code).toBe('package_install');
  });

  it('blocks obvious network imports', () => {
    const result = validateSourcePolicy('import requests\nprint(requests.get("https://example.com"))');
    expect(result.ok).toBe(false);
    expect(result.code).toBe('network_access');
  });

  it('accepts small text-only scripts', () => {
    const result = validateSourcePolicy('print("ok")');
    expect(result).toEqual({ ok: true });
  });
});
