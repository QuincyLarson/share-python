import { expect, test } from '@playwright/test';

import { APP_CONFIG, FOUNDATION_OUTPUT } from '../../src/config.js';
import { STARTER_PROMPT } from '../../src/starter.js';

const FOUNDATION_LINES = FOUNDATION_OUTPUT.split('\n').filter(Boolean);

const FAST_SMOKE_SCRIPT = [
  'name = "Playwright"',
  'print(f"hello from {name}")',
].join('\n');

const LONG_LINE_TEXT = 'wrap-me-'.repeat(120);
const LONG_OUTPUT_LINE_SCRIPT = `value = "${LONG_LINE_TEXT}"\nprint(value)`;

const FULL_RUNTIME_MULTILINE_SCRIPT = [
  'from __future__ import annotations',
  '',
  'from dataclasses import dataclass',
  '',
  '@dataclass',
  'class ReportLine:',
  '    label: str',
  '',
  'for line in [ReportLine("alpha"), ReportLine("beta"), ReportLine("gamma")]:',
  '    print(line.label)',
].join('\n');

const FULL_RUNTIME_RERUN_FIRST_SCRIPT = [
  'from __future__ import annotations',
  'from dataclasses import dataclass',
  '',
  'print("first run")',
].join('\n');

const FULL_RUNTIME_RERUN_SECOND_SCRIPT = [
  'from __future__ import annotations',
  'from dataclasses import dataclass',
  '',
  'print("second run")',
].join('\n');

const FULL_RUNTIME_STDLIB_SCRIPT = [
  'from __future__ import annotations',
  '',
  'from dataclasses import dataclass',
  'from typing import Optional',
  'import math',
  '',
  '@dataclass',
  'class Scenario:',
  '    label: str',
  '    amount: float',
  '    note: Optional[str] = None',
  '',
  'result = Scenario("sqrt", math.sqrt(81), "stdlib smoke test")',
  'print(result)',
].join('\n');

const DYNAMIC_FULL_RUNTIME_SCRIPT = [
  'module_name = "fractions"',
  'fractions = __import__(module_name)',
  'print(fractions.Fraction(3, 2))',
].join('\n');

async function gotoApp(page, options = {}) {
  const { pathname = '/', fragment = '' } = options;
  await page.goto(fragment ? `${pathname}#${fragment}` : pathname);
  await expect(page.locator('#editor')).toBeVisible();
}

async function fillEditor(page, source) {
  const editor = page.locator('#editor');
  await editor.fill(source);
  await expect(editor).toHaveValue(source);
}

async function assertFoundationOutput(page) {
  const output = page.locator('#output');

  for (const line of FOUNDATION_LINES) {
    await expect(output).toContainText(line);
  }

  await expect(output).not.toContainText('=== Run');
}

async function captureCopiedShareUrl(page) {
  return page.evaluate(() => window.__copiedTexts.at(-1) ?? null);
}

async function loadLibraryExample(page, { searchTerm, exampleId, topicLabel }) {
  await page.locator('#load-example-button').click();
  await page.locator('#example-search').fill(searchTerm);

  const exampleRow = page.locator(`#examples-list [data-example-id="${exampleId}"]`);
  await expect(exampleRow).toBeVisible();

  if (topicLabel) {
    await expect(exampleRow.locator('.example-list__meta')).toHaveText(topicLabel);
  }

  await exampleRow.locator('.example-list__link').click();
}

test('loads the shell and prepopulates issue reporting for the starter example', async ({ page }) => {
  await gotoApp(page);

  await expect(page.locator('#editor')).toHaveValue(new RegExp(`^${STARTER_PROMPT}`));
  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop-button')).toHaveCount(0);
  await assertFoundationOutput(page);

  const issueHref = await page.locator('#report-issue-link').getAttribute('href');
  const issueUrl = new URL(issueHref);

  expect(issueUrl.origin).toBe('https://github.com');
  expect(issueUrl.pathname).toBe('/QuincyLarson/share-python/issues/new');
  expect(issueUrl.searchParams.get('title')).toMatch(/^\[Example\] /);
  expect(issueUrl.searchParams.get('body')).toContain('#ex=');
});

test('shows a flat library count, hides hello runner, and relabels health topics', async ({
  page,
}) => {
  await gotoApp(page);
  await page.locator('#load-example-button').click();

  await expect(page.locator('#examples-title')).toHaveText('Library of 143 Python Scripts');
  await expect(page.locator('.example-group__title')).toHaveCount(0);
  await expect(page.locator('#examples-list [data-example-id="hello-runner"]')).toHaveCount(0);

  await page.locator('#example-search').fill('hello runner');
  await expect(page.locator('#examples-title')).toHaveText('Library of 0 Python Scripts');
  await expect(page.locator('.examples-list__empty')).toHaveText('No scripts found.');

  await page.locator('#example-search').fill('gfr');
  await expect(page.locator('#examples-title')).toHaveText('Library of 1 Python Script');
  await expect(
    page.locator('#examples-list [data-example-id="gfr-calculator"] .example-list__meta'),
  ).toHaveText('Health');
});

test('runs a script in Fast Python, supports local select-all, copies output, and clears output', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.__copiedTexts = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__copiedTexts.push(text);
        },
      },
    });
  });

  await gotoApp(page);
  await fillEditor(page, FAST_SMOKE_SCRIPT);
  await page.locator('#editor').press('Control+A');

  const editorSelection = await page.evaluate(() => {
    const editor = document.querySelector('#editor');
    return {
      start: editor.selectionStart,
      end: editor.selectionEnd,
      length: editor.value.length,
    };
  });

  expect(editorSelection).toEqual({
    start: 0,
    end: FAST_SMOKE_SCRIPT.length,
    length: FAST_SMOKE_SCRIPT.length,
  });

  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('Run 1 · Fast Python', {
    timeout: 30_000,
  });
  await expect(page.locator('#output')).toContainText('hello from Playwright', {
    timeout: 30_000,
  });
  await expect(page.locator('#output')).toContainText('[completed]', {
    timeout: 30_000,
  });
  await expect(page.locator('#donation-cta')).toBeVisible();

  await page.locator('#output').click();
  await page.locator('#output').press('Control+A');

  await expect.poll(() => page.evaluate(() => window.getSelection().toString())).toContain(
    'hello from Playwright',
  );
  await expect.poll(() => page.evaluate(() => window.getSelection().toString())).not.toContain(
    'SharePython.com',
  );

  await page.locator('#copy-output-button').click();

  await expect
    .poll(() => captureCopiedShareUrl(page))
    .toContain('hello from Playwright');

  await page.locator('#clear-output-button').click();

  await assertFoundationOutput(page);
  await expect(page.locator('#donation-cta')).toBeHidden();
});

test('reruns edited scripts and replaces the previous output', async ({ page }) => {
  await gotoApp(page);
  await fillEditor(page, FULL_RUNTIME_RERUN_FIRST_SCRIPT);
  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('Run 1 · Full Python', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).toContainText('first run', {
    timeout: 45_000,
  });

  await fillEditor(page, FULL_RUNTIME_RERUN_SECOND_SCRIPT);
  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('Run 2 · Full Python', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).toContainText('second run', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).not.toContainText('first run');
  await expect(page.locator('#output')).not.toContainText('Run 1 · Full Python');
});

test('keeps long code and output on one line with horizontal scrolling', async ({ page }) => {
  await gotoApp(page);
  await fillEditor(page, LONG_OUTPUT_LINE_SCRIPT);

  const editorMetrics = await page.locator('#editor').evaluate((element) => ({
    wrap: element.getAttribute('wrap'),
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
  }));

  expect(editorMetrics.wrap).toBe('off');
  expect(editorMetrics.scrollWidth).toBeGreaterThan(editorMetrics.clientWidth);

  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('wrap-me-wrap-me-', {
    timeout: 30_000,
  });

  const outputMetrics = await page.locator('#output').evaluate((element) => ({
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
    whiteSpace: window.getComputedStyle(element).whiteSpace,
  }));

  expect(outputMetrics.whiteSpace).toBe('pre');
  expect(outputMetrics.scrollWidth).toBeGreaterThan(outputMetrics.clientWidth);
});

test('uses the full viewport width and keeps editor and output evenly split on wide screens', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1800, height: 900 });
  await gotoApp(page);

  const layoutMetrics = await page.evaluate(() => {
    const shell = document.querySelector('.app-shell');
    const panes = document.querySelector('.panes');
    const editorPane = document.querySelector('.pane--editor');
    const outputPane = document.querySelector('.pane--output');

    return {
      viewportWidth: window.innerWidth,
      shellWidth: shell?.getBoundingClientRect().width ?? 0,
      panesWidth: panes?.getBoundingClientRect().width ?? 0,
      editorWidth: editorPane?.getBoundingClientRect().width ?? 0,
      outputWidth: outputPane?.getBoundingClientRect().width ?? 0,
    };
  });

  expect(layoutMetrics.shellWidth).toBeGreaterThanOrEqual(layoutMetrics.viewportWidth - 4);
  expect(layoutMetrics.panesWidth).toBeGreaterThan(layoutMetrics.viewportWidth - 32);
  expect(Math.abs(layoutMetrics.editorWidth - layoutMetrics.outputWidth)).toBeLessThanOrEqual(2);
});

test('copies a share link that restores editor contents without autorun', async ({
  page,
  context,
}) => {
  await page.addInitScript(() => {
    window.__copiedTexts = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__copiedTexts.push(text);
        },
      },
    });
  });

  await gotoApp(page);

  const customSource = [
    'numbers = [12, 18, 30]',
    'print(sum(numbers))',
  ].join('\n');

  await fillEditor(page, customSource);
  await page.locator('#copy-share-link-button').click();

  const copiedUrl = await captureCopiedShareUrl(page);
  expect(copiedUrl).toContain('#');

  const sharedPage = await context.newPage();
  await sharedPage.goto(copiedUrl);

  await expect(sharedPage.locator('#editor')).toHaveValue(customSource);
  await assertFoundationOutput(sharedPage);
});

test('loads a generated calculator route page with calculator-specific metadata and source', async ({
  page,
}) => {
  await page.addInitScript(({ storageKey }) => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        source: 'print("draft should not win")',
        exampleId: null,
        runtimeHint: 'fast',
      }),
    );

    window.__copiedTexts = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__copiedTexts.push(text);
        },
      },
    });
  }, { storageKey: APP_CONFIG.storageKey });

  await gotoApp(page, {
    pathname: '/financial-calculators/mortgage-calculator/',
  });

  await expect(page).toHaveTitle(/Mortgage Calculator Python Script/i);
  await expect(page.locator('#editor')).toHaveValue(/# Mortgage Calculator/);
  await expect(page.locator('#editor')).not.toHaveValue(/draft should not win/);
  await expect(page.locator('#editor')).not.toHaveValue(new RegExp(`^${STARTER_PROMPT}`));

  await page.locator('#copy-share-link-button').click();
  await expect
    .poll(() => captureCopiedShareUrl(page))
    .toBe('http://127.0.0.1:4174/financial-calculators/mortgage-calculator/');

  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('Mortgage payment summary', {
    timeout: 30_000,
  });
  await expect(page.locator('#output')).toContainText('Monthly payment:', {
    timeout: 30_000,
  });
});

test('serves generated math and health calculator pages directly from the preview build', async ({
  page,
}) => {
  await gotoApp(page, {
    pathname: '/math-calculators/percentage-calculator/',
  });

  await expect(page).toHaveTitle(/Percentage Calculator Python Script/i);
  await expect(page.locator('#editor')).toHaveValue(/# Percentage Calculator/);
  await page.locator('#run-button').click();
  await expect(page.locator('#output')).toContainText('Percent change:', {
    timeout: 30_000,
  });

  await gotoApp(page, {
    pathname: '/health-calculators/gfr-calculator/',
  });

  await expect(page).toHaveTitle(/GFR Calculator Python Script/i);
  await expect(page.locator('#editor')).toHaveValue(/# GFR Calculator/);
  await page.locator('#run-button').click();
  await expect(page.locator('#output')).toContainText('Estimated GFR:', {
    timeout: 30_000,
  });
});

test('runs the time zone library example in Fast Python', async ({ page }) => {
  await gotoApp(page);
  await loadLibraryExample(page, {
    searchTerm: 'time zone',
    exampleId: 'timezone-deadline',
    topicLabel: 'Time & timezone',
  });
  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('Deadline by time zone', {
    timeout: 30_000,
  });
  await expect(page.locator('#output')).toContainText('Chicago', {
    timeout: 30_000,
  });
  await expect(page.locator('#output')).toContainText('[completed]', {
    timeout: 30_000,
  });
});

test('routes common stdlib imports straight to Full Python', async ({ page }) => {
  test.slow();

  await gotoApp(page);
  await fillEditor(page, FULL_RUNTIME_STDLIB_SCRIPT);
  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('Run 1 · Full Python', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).toContainText('Scenario(label=', {
    timeout: 45_000,
  });
  await expect(page.locator('#runtime-prompt')).toBeHidden();
});

test('preserves newline-separated output in Full Python', async ({ page }) => {
  test.slow();

  await gotoApp(page);
  await fillEditor(page, FULL_RUNTIME_MULTILINE_SCRIPT);
  await page.locator('#run-button').click();

  await expect
    .poll(() => page.locator('#output').textContent(), { timeout: 45_000 })
    .toContain('alpha\nbeta\ngamma');
});

test('formats the mortgage example output with commas and line breaks', async ({ page }) => {
  await gotoApp(page);
  await loadLibraryExample(page, {
    searchTerm: 'mortgage',
    exampleId: 'mortgage-payment',
    topicLabel: 'Money & loans',
  });
  await page.locator('#run-button').click();

  await expect
    .poll(() => page.locator('#output').textContent(), { timeout: 30_000 })
    .toContain('Monthly payment: $2,001.08\nTotal of payments: $720,389.12');

  await expect(page.locator('#output')).toContainText('Total of payments: $720,389.12', {
    timeout: 30_000,
  });
  await expect(page.locator('#output')).toContainText('Mortgage payment estimate', {
    timeout: 30_000,
  });
});

test('times out a long-running Fast Python script after 10 seconds', async ({ page }) => {
  test.slow();

  await gotoApp(page);
  await fillEditor(page, 'while True:\n    pass');

  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText(
    'Error: Run time exceeded 10 seconds. Check your script for infinite loops.',
    {
      timeout: 15_000,
    },
  );
  await expect(page.locator('#output')).not.toContainText('[completed]');
  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop-button')).toHaveCount(0);
});

test('offers a Full Python retry for a runtime mismatch and succeeds after retry', async ({
  page,
}) => {
  test.slow();

  await gotoApp(page);
  await fillEditor(page, DYNAMIC_FULL_RUNTIME_SCRIPT);
  await page.locator('#run-button').click();

  await expect(page.locator('#output')).toContainText('Run 1 · Fast Python', {
    timeout: 30_000,
  });
  await expect(page.locator('#runtime-prompt')).toBeVisible({
    timeout: 30_000,
  });

  await page.locator('#retry-full-runtime-button').click();

  await expect(page.locator('#output')).toContainText('Run 2 · Full Python', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).toContainText('3/2', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).toContainText('[completed]', {
    timeout: 45_000,
  });
});
