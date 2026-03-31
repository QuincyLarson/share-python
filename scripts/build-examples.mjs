import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { EXAMPLE_ROUTE_PREFIX } from '../src/example-routes.js';
import { buildGeneratedFinancialExamples } from './financial-calculator-catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const manifestSourcePath = path.join(repoRoot, 'examples', 'manifest.source.json');
const generatedManifestPath = path.join(repoRoot, 'src', 'generated', 'examples-manifest.js');
const generatedPageManifestPath = path.join(repoRoot, 'src', 'generated', 'example-pages.js');
const routePagesRoot = path.join(repoRoot, EXAMPLE_ROUTE_PREFIX);
const rootTemplatePath = path.join(repoRoot, 'index.html');
const routeHubPath = path.join(routePagesRoot, 'index.html');

const requiredFields = [
  'id',
  'title',
  'category',
  'summary',
  'tags',
  'runtime',
  'difficulty',
  'description',
  'issueContext',
  'checks',
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function toDefinitionArray(definitions) {
  if (!Array.isArray(definitions)) {
    throw new Error('Example definitions must be an array.');
  }

  return definitions;
}

async function readRootTemplate() {
  return readFile(rootTemplatePath, 'utf8');
}

function buildAllDefinitions(sourceDefinitions) {
  return [...sourceDefinitions, ...buildGeneratedFinancialExamples()];
}

function validateHeaderComment(exampleId, script) {
  const headerLines = script
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .slice(0, 5);

  if (
    headerLines.length < 5 ||
    headerLines.some((line) => !line.trim().startsWith('#'))
  ) {
    throw new Error(`Example "${exampleId}" must start with a five-line comment header.`);
  }
}

function resolveExampleScript(definition, scriptMap) {
  if (typeof definition.script === 'string' && definition.script.trim().length > 0) {
    return definition.script;
  }

  if (typeof definition.scriptPath !== 'string' || definition.scriptPath.trim() === '') {
    throw new Error(
      `Example "${definition.id ?? '<missing id>'}" must include either "script" or "scriptPath".`,
    );
  }

  const script = scriptMap.get(definition.scriptPath);
  if (!script) {
    throw new Error(`Missing script for "${definition.id}" at "${definition.scriptPath}".`);
  }

  return script;
}

function buildRelativeRootPath(pagePath) {
  const segments = pagePath.split('/').filter(Boolean);
  const levels = Math.max(segments.length, 0);
  return levels === 0 ? './' : '../'.repeat(levels);
}

function applyMetaContent(html, property, value) {
  const escapedValue = escapeHtml(value);
  return html.replace(
    new RegExp(`(<meta\\s+(?:name|property)="${property}"\\s+content=")[^"]*("\\s*\\/?>)`),
    `$1${escapedValue}$2`,
  );
}

function buildRoutePageHtml(template, example) {
  const relativeRootPath = buildRelativeRootPath(example.pagePath);
  const title = example.seoTitle ?? `${example.title} | SharePython.com`;
  const description =
    example.seoDescription ??
    `${example.summary} Edit the Python script and run it in your browser with no sign-in.`;

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = applyMetaContent(html, 'description', description);
  html = applyMetaContent(html, 'og:title', title);
  html = applyMetaContent(html, 'og:description', description);
  html = html.replace(
    '<link rel="license" href="./LICENSE" />',
    `<link rel="license" href="${relativeRootPath}LICENSE" />`,
  );
  html = html.replace(
    '<script type="module" src="./src/main.js"></script>',
    `<script type="module" src="${relativeRootPath}src/main.js"></script>`,
  );
  html = html.replace(
    '<body>',
    `<body data-route-example-id="${escapeHtml(example.id)}">`,
  );

  return html;
}

function buildRouteHubPage(examples) {
  const groupedExamples = examples.reduce((groups, example) => {
    const collection = groups.get(example.pageSection) ?? [];
    collection.push(example);
    groups.set(example.pageSection, collection);
    return groups;
  }, new Map());

  const sections = [...groupedExamples.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([section, sectionExamples]) => {
      const items = sectionExamples
        .slice()
        .sort((left, right) => left.title.localeCompare(right.title))
        .map(
          (example) => `
            <li>
              <a href="./${escapeHtml(example.routeSlug)}/">${escapeHtml(example.title)}</a>
              <p>${escapeHtml(example.summary)}</p>
            </li>`,
        )
        .join('');

      return `
        <section class="hub-section">
          <h2>${escapeHtml(section)}</h2>
          <ul class="hub-list">${items}
          </ul>
        </section>`;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Financial Calculators in Python | SharePython.com</title>
    <meta
      name="description"
      content="Browse browser-run financial calculator Python scripts with dedicated pages for mortgages, loans, investing, retirement, taxes, and more."
    />
    <meta property="og:title" content="Financial Calculators in Python | SharePython.com" />
    <meta
      property="og:description"
      content="Browse browser-run financial calculator Python scripts with dedicated pages for mortgages, loans, investing, retirement, taxes, and more."
    />
    <meta property="og:type" content="website" />
    <style>
      :root {
        color-scheme: light dark;
        --bg: #f5f6f7;
        --surface: #ffffff;
        --text: #0a0a23;
        --muted: #3b3b4f;
        --border: #d0d0d5;
        --accent: #0a0a23;
        --accent-text: #ffffff;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0a0a23;
          --surface: #1b1b32;
          --text: #f5f6f7;
          --muted: #d0d0d5;
          --border: #3b3b4f;
          --accent: #f1be32;
          --accent-text: #0a0a23;
        }
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font: 400 16px/1.5 sans-serif;
        background: var(--bg);
        color: var(--text);
      }

      main {
        max-width: 1120px;
        margin: 0 auto;
        padding: 32px 20px 72px;
      }

      h1,
      h2,
      p,
      ul {
        margin: 0;
      }

      .hub-header {
        display: grid;
        gap: 12px;
        margin-bottom: 28px;
      }

      .hub-header a {
        width: fit-content;
        padding: 8px 12px;
        border: 1px solid var(--border);
        color: var(--text);
        text-decoration: none;
        background: var(--surface);
      }

      .hub-grid {
        display: grid;
        gap: 20px;
      }

      .hub-section {
        padding: 18px;
        border: 1px solid var(--border);
        background: var(--surface);
      }

      .hub-section h2 {
        margin-bottom: 14px;
        font-size: 1.05rem;
      }

      .hub-list {
        display: grid;
        gap: 14px;
        padding: 0;
        list-style: none;
      }

      .hub-list a {
        color: var(--accent);
        font-weight: 700;
        text-decoration: none;
      }

      .hub-list p {
        margin-top: 4px;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main>
      <header class="hub-header">
        <a href="../">Open the runner</a>
        <h1>Financial calculator Python scripts</h1>
        <p>
          Each calculator page opens a runnable Python script with editable constants and plain-text
          output.
        </p>
      </header>
      <div class="hub-grid">
${sections}
      </div>
    </main>
  </body>
</html>
`;
}

export async function loadExampleDefinitions(sourcePath = manifestSourcePath) {
  return toDefinitionArray(JSON.parse(await readFile(sourcePath, 'utf8')));
}

export function validateExampleDefinitions(definitions, scriptMap) {
  const seenIds = new Set();

  return definitions.map((definition) => {
    for (const field of requiredFields) {
      if (definition[field] == null || definition[field] === '') {
        throw new Error(`Example "${definition.id ?? '<missing id>'}" is missing "${field}".`);
      }
    }

    if (seenIds.has(definition.id)) {
      throw new Error(`Duplicate example id "${definition.id}".`);
    }

    seenIds.add(definition.id);

    if (!Array.isArray(definition.tags) || definition.tags.length === 0) {
      throw new Error(`Example "${definition.id}" must include at least one tag.`);
    }

    if (!Array.isArray(definition.checks) || definition.checks.length === 0) {
      throw new Error(`Example "${definition.id}" must include at least one check.`);
    }

    const script = resolveExampleScript(definition, scriptMap);
    validateHeaderComment(definition.id, script);

    return {
      ...definition,
      script,
    };
  });
}

export async function generateRoutePages(examples, template = null) {
  const routeExamples = examples.filter((example) => example.routeSlug && example.pagePath);

  if (routeExamples.length === 0) {
    return [];
  }

  const pageTemplate = template ?? (await readRootTemplate());
  const pageWrites = routeExamples.map(async (example) => {
    const relativePagePath = example.pagePath.replace(/^\//, '');
    const outputPath = path.join(repoRoot, relativePagePath, 'index.html');
    const html = buildRoutePageHtml(pageTemplate, example);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
    return outputPath;
  });

  await mkdir(routePagesRoot, { recursive: true });
  await writeFile(routeHubPath, buildRouteHubPage(routeExamples), 'utf8');

  return Promise.all(pageWrites);
}

export async function writeExamplePagesManifest(
  examples,
  outputPath = generatedPageManifestPath,
) {
  const routeExamples = examples
    .filter((example) => example.routeSlug && example.pagePath)
    .map((example) => ({
      exampleId: example.id,
      title: example.title,
      routeSlug: example.routeSlug,
      pagePath: example.pagePath,
      seoTitle: example.seoTitle,
      seoDescription: example.seoDescription,
    }));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `export const examplePages = ${JSON.stringify(routeExamples, null, 2)};\n`, 'utf8');
  return routeExamples;
}

export async function buildExamplesManifest({
  sourcePath = manifestSourcePath,
  outputPath = generatedManifestPath,
  writeRoutePages = outputPath === generatedManifestPath,
  writePageManifest = outputPath === generatedManifestPath,
} = {}) {
  const sourceDefinitions = await loadExampleDefinitions(sourcePath);
  const definitions = buildAllDefinitions(sourceDefinitions);
  const scriptMap = new Map();

  for (const definition of definitions) {
    if (typeof definition.script === 'string') {
      continue;
    }

    const absoluteScriptPath = path.join(repoRoot, definition.scriptPath);
    const script = await readFile(absoluteScriptPath, 'utf8');
    scriptMap.set(definition.scriptPath, script);
  }

  const manifest = validateExampleDefinitions(definitions, scriptMap);
  const fileContents = `export const examples = ${JSON.stringify(manifest, null, 2)};\n`;

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, fileContents, 'utf8');

  if (writePageManifest) {
    await writeExamplePagesManifest(manifest);
  }

  if (writeRoutePages) {
    const template = existsSync(rootTemplatePath) ? await readRootTemplate() : null;
    await generateRoutePages(manifest, template);
  }

  return manifest;
}

const isMainModule =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  const manifest = await buildExamplesManifest();
  const routePageCount = manifest.filter((example) => example.pagePath).length;
  console.log(
    `Generated ${manifest.length} examples and ${routePageCount} calculator pages into ${path.relative(repoRoot, generatedManifestPath)}.`,
  );
}
