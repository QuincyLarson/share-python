import path from 'node:path';
import { readFile, unlink } from 'node:fs/promises';
import { afterEach, describe, expect, it } from 'vitest';

import { buildExamplesManifest } from '../../scripts/build-examples.mjs';
import {
  EXAMPLES,
  filterExamples,
  getExampleLibraryTopic,
  validateExampleManifest,
} from '../../src/examples.js';
import { examplePages } from '../../src/generated/example-pages.js';

const tempManifestPath = path.join(process.cwd(), 'tmp-examples-manifest.js');
const homePagePath = path.join(process.cwd(), 'index.html');
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

afterEach(async () => {
  await unlink(tempManifestPath).catch(() => {});
});

describe('example manifest', () => {
  it('keeps the generated example pack well formed', async () => {
    const manifest = await buildExamplesManifest({
      outputPath: tempManifestPath,
    });

    expect(manifest.length).toBe(144);
    expect(manifest[0].id).toBe('hello-runner');
    expect(manifest.some((example) => example.id === 'running-pace')).toBe(true);
    expect(manifest.some((example) => example.id === 'recipe-fraction-scaler')).toBe(true);
    expect(manifest.some((example) => example.id === 'mortgage-calculator')).toBe(true);
    expect(manifest.some((example) => example.id === 'percentage-calculator')).toBe(true);
    expect(manifest.some((example) => example.id === 'gfr-calculator')).toBe(true);
    expect(manifest.some((example) => example.id === 'bac-calculator')).toBe(true);
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

  it('keeps the script library flattened, ordered, and free of the starter example', () => {
    const orderedExamples = filterExamples();
    const firstTopicTitles = orderedExamples.slice(0, 5).map((example) => ({
      topic: getExampleLibraryTopic(example),
      title: example.title,
    }));
    const firstExampleByTopic = orderedExamples.reduce((topics, example) => {
      const topic = getExampleLibraryTopic(example);

      if (!(topic in topics)) {
        topics[topic] = example.title;
      }

      return topics;
    }, {});

    expect(orderedExamples).toHaveLength(143);
    expect(orderedExamples.some((example) => example.id === 'hello-runner')).toBe(false);
    expect(firstTopicTitles).toEqual([
      { topic: 'Arithmetic', title: 'Big Number Calculator' },
      { topic: 'Arithmetic', title: 'Binary Calculator' },
      { topic: 'Arithmetic', title: 'Exponent Calculator' },
      { topic: 'Arithmetic', title: 'Factor Calculator' },
      { topic: 'Arithmetic', title: 'Fraction Calculator' },
    ]);
    expect(firstExampleByTopic.Health).toBe('BAC Calculator');
    expect(firstExampleByTopic['Real Estate']).toBe('Amortization Calculator');
    expect(firstExampleByTopic['Time & timezone']).toBe('Business days between dates');
  });

  it('publishes dedicated calculator route pages for finance, math, and health examples', () => {
    const routePrefixCounts = examplePages.reduce((counts, page) => {
      const routePrefix = page.pagePath.split('/').filter(Boolean)[0];
      counts[routePrefix] = (counts[routePrefix] ?? 0) + 1;
      return counts;
    }, {});

    expect(examplePages).toHaveLength(136);
    expect(examplePages.some((page) => page.routeSlug === 'mortgage-calculator')).toBe(true);
    expect(examplePages.some((page) => page.routeSlug === 'percentage-calculator')).toBe(true);
    expect(examplePages.some((page) => page.routeSlug === 'gfr-calculator')).toBe(true);
    expect(examplePages.some((page) => page.routeSlug === 'bac-calculator')).toBe(true);
    expect(routePrefixCounts).toEqual({
      'financial-calculators': 71,
      'health-calculators': 27,
      'math-calculators': 38,
    });
  });

  it('publishes sitemap, robots, and homepage structured data for the calculator families', async () => {
    const [homePageHtml, sitemap, robots] = await Promise.all([
      readFile(homePagePath, 'utf8'),
      readFile(sitemapPath, 'utf8'),
      readFile(robotsPath, 'utf8'),
    ]);

    expect(homePageHtml).toContain('Popular calculator scripts');
    expect(homePageHtml).toContain('https://sharepython.com/financial-calculators/mortgage-calculator/');
    expect(homePageHtml).toContain('https://sharepython.com/math-calculators/percentage-calculator/');
    expect(homePageHtml).toContain('https://sharepython.com/health-calculators/bmi-calculator/');

    expect(robots).toContain('Sitemap: https://sharepython.com/sitemap.xml');
    expect(sitemap).toContain('<loc>https://sharepython.com/financial-calculators/</loc>');
    expect(sitemap).toContain('<loc>https://sharepython.com/math-calculators/</loc>');
    expect(sitemap).toContain('<loc>https://sharepython.com/health-calculators/</loc>');
    expect(sitemap).toContain('<loc>https://sharepython.com/math-calculators/percentage-calculator/</loc>');
    expect(sitemap).toContain('<loc>https://sharepython.com/health-calculators/gfr-calculator/</loc>');
    expect(sitemap).toContain('<loc>https://sharepython.com/health-calculators/bac-calculator/</loc>');
  });
});
