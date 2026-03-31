import path from 'node:path';
import { unlink } from 'node:fs/promises';
import { afterEach, describe, expect, it } from 'vitest';

import { buildExamplesManifest } from '../../scripts/build-examples.mjs';
import { EXAMPLES, validateExampleManifest } from '../../src/examples.js';
import { examplePages } from '../../src/generated/example-pages.js';

const tempManifestPath = path.join(process.cwd(), 'tmp-examples-manifest.js');

afterEach(async () => {
  await unlink(tempManifestPath).catch(() => {});
});

describe('example manifest', () => {
  it('keeps the generated example pack well formed', async () => {
    const manifest = await buildExamplesManifest({
      outputPath: tempManifestPath,
    });

    expect(manifest.length).toBe(80);
    expect(manifest[0].id).toBe('hello-runner');
    expect(manifest.some((example) => example.id === 'running-pace')).toBe(true);
    expect(manifest.some((example) => example.id === 'recipe-fraction-scaler')).toBe(true);
    expect(manifest.some((example) => example.id === 'mortgage-calculator')).toBe(true);
    expect(manifest.every((example) => Array.isArray(example.checks) && example.checks.length > 0)).toBe(true);
  });

  it('exposes generated examples to the app with source text attached', () => {
    const validation = validateExampleManifest(EXAMPLES);

    for (const entry of validation) {
      expect(entry.missing).toEqual([]);
      expect(entry.hasHeaderComment).toBe(true);
      expect(entry.hasChecks).toBe(true);
    }
  });

  it('publishes dedicated calculator route pages for generated financial examples', () => {
    expect(examplePages).toHaveLength(71);
    expect(examplePages.some((page) => page.routeSlug === 'mortgage-calculator')).toBe(true);
    expect(examplePages.every((page) => page.pagePath.startsWith('/financial-calculators/'))).toBe(
      true,
    );
  });
});
