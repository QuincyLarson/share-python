import { expect, test } from '@playwright/test';

import { FOUNDATION_OUTPUT } from '../../src/config.js';

const FOUNDATION_LINES = FOUNDATION_OUTPUT.split('\n').filter(Boolean);

const FAST_SMOKE_SCRIPT = [
  'name = "Playwright"',
  'print(f"hello from {name}")',
].join('\n');

function addCompatibilitySmokeComment(source) {
  return `${source}\n# Playwright compatibility smoke test`;
}

async function gotoApp(page, fragment = '') {
  await page.goto(fragment ? `/#${fragment}` : '/');
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

test('loads the shell and prepopulates issue reporting for the starter example', async ({ page }) => {
  await gotoApp(page);

  await expect(page.locator('#editor')).toHaveValue(/print\("freeCodeCamp Python Runner"\)/);
  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop-button')).toBeDisabled();
  await assertFoundationOutput(page);

  const issueHref = await page.locator('#report-issue-link').getAttribute('href');
  const issueUrl = new URL(issueHref);

  expect(issueUrl.origin).toBe('https://github.com');
  expect(issueUrl.pathname).toBe('/QuincyLarson/share-python/issues/new');
  expect(issueUrl.searchParams.get('title')).toBe('[Example] Hello Runner');
  expect(issueUrl.searchParams.get('body')).toContain('Hello Runner (`hello-runner`)');
  expect(issueUrl.searchParams.get('body')).toContain('#ex=hello-runner');
});

test('runs a script in Fast Python, shows the donate CTA, and clears output', async ({ page }) => {
  await gotoApp(page);
  await fillEditor(page, FAST_SMOKE_SCRIPT);

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

  await page.locator('#clear-output-button').click();

  await assertFoundationOutput(page);
  await expect(page.locator('#donation-cta')).toBeHidden();
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

test('stops a long-running Fast Python script', async ({ page }) => {
  await gotoApp(page);
  await fillEditor(page, 'while True:\n    pass');

  await page.locator('#run-button').click();
  await expect(page.locator('#stop-button')).toBeEnabled();
  await page.locator('#stop-button').click();

  await expect(page.locator('#output')).toContainText('[stopped fast python]', {
    timeout: 10_000,
  });
  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop-button')).toBeDisabled();
});

test('offers a Full Python retry for an incompatible example and succeeds after retry', async ({
  page,
}) => {
  test.slow();

  await gotoApp(page);

  await page.locator('#load-example-button').click();
  await expect(page.locator('#examples-dialog')).toBeVisible();
  await page.locator('#example-search').fill('recipe');

  const exampleCard = page.locator('.example-card').filter({ hasText: 'Recipe fraction scaler' });
  await exampleCard.getByRole('button', { name: 'Load example' }).click();

  const originalSource = await page.locator('#editor').inputValue();
  await fillEditor(page, addCompatibilitySmokeComment(originalSource));
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
  await expect(page.locator('#output')).toContainText('Scaled ingredient list', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).toContainText('flour (cups)', {
    timeout: 45_000,
  });
  await expect(page.locator('#output')).toContainText('[completed]', {
    timeout: 45_000,
  });
});
