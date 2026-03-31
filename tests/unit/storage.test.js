import { describe, expect, it } from 'vitest';
import { EXAMPLES } from '../../src/examples.js';
import { resolveInitialSource } from '../../src/storage.js';

describe('initial source resolution', () => {
  it('prefers a share fragment over local draft data', () => {
    const result = resolveInitialSource({
      fragmentState: {
        source: 'print("from share")',
        exampleId: null,
        runtimeHint: 'full',
      },
      localDraft: {
        source: 'print("from local draft")',
        exampleId: EXAMPLES[0].id,
        runtimeHint: 'fast',
      },
      defaultExample: EXAMPLES[0],
    });

    expect(result.origin).toBe('shared code');
    expect(result.source).toContain('from share');
  });

  it('falls back to the default example when nothing else is present', () => {
    const result = resolveInitialSource({
      fragmentState: null,
      localDraft: null,
      defaultExample: EXAMPLES[0],
    });

    expect(result.origin).toBe('starter example');
    expect(result.exampleId).toBe(EXAMPLES[0].id);
  });

  it('keeps a share-fragment warning when decode fails', () => {
    const result = resolveInitialSource({
      fragmentState: {
        source: null,
        exampleId: null,
        runtimeHint: null,
        error: 'Shared code could not be decoded.',
      },
      localDraft: {
        source: 'print("local")',
        exampleId: null,
        runtimeHint: 'fast',
      },
      defaultExample: EXAMPLES[0],
    });

    expect(result.origin).toBe('starter example');
    expect(result.warning).toBe('Shared code could not be decoded.');
  });

  it('prefers the route example over local draft content on calculator pages', () => {
    const routeExample = EXAMPLES.find((example) => example.id === 'mortgage-calculator');
    const result = resolveInitialSource({
      fragmentState: null,
      localDraft: {
        source: 'print("draft should not win")',
        exampleId: null,
        runtimeHint: 'fast',
      },
      defaultExample: routeExample,
    });

    expect(result.origin).toBe('route example');
    expect(result.exampleId).toBe(routeExample.id);
    expect(result.source).toBe(routeExample.source);
  });

  it('preserves a runtime override fragment on route pages', () => {
    const routeExample = EXAMPLES.find((example) => example.id === 'mortgage-calculator');
    const result = resolveInitialSource({
      fragmentState: {
        source: null,
        exampleId: null,
        runtimeHint: 'full',
        error: null,
      },
      localDraft: null,
      defaultExample: routeExample,
    });

    expect(result.origin).toBe('route example');
    expect(result.runtimeHint).toBe('full');
  });
});
