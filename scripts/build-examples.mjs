import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  EXAMPLE_ROUTE_PREFIX,
  EXAMPLE_ROUTE_PREFIXES,
  HEALTH_EXAMPLE_ROUTE_PREFIX,
  MATH_EXAMPLE_ROUTE_PREFIX,
} from '../src/example-routes.js';
import { buildGeneratedFinancialExamples } from './financial-calculator-catalog.mjs';
import { buildGeneratedHealthExamples } from './health-calculator-catalog.mjs';
import { buildGeneratedMathExamples } from './math-calculator-catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const siteOrigin = 'https://sharepython.com';
const publicRoot = path.join(repoRoot, 'public');

const manifestSourcePath = path.join(repoRoot, 'examples', 'manifest.source.json');
const generatedManifestPath = path.join(repoRoot, 'src', 'generated', 'examples-manifest.js');
const generatedPageManifestPath = path.join(repoRoot, 'src', 'generated', 'example-pages.js');
const rootTemplatePath = path.join(repoRoot, 'index.html');
const sitemapPath = path.join(publicRoot, 'sitemap.xml');
const robotsPath = path.join(publicRoot, 'robots.txt');

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

const routeCollectionMetadata = {
  [EXAMPLE_ROUTE_PREFIX]: {
    pageGroup: 'Finance',
    heading: 'Financial calculator Python scripts',
    title: 'Financial Calculators in Python | SharePython.com',
    description:
      'Browse browser-run financial calculator Python scripts for mortgages, loans, investing, retirement, taxes, and other money planning.',
    intro:
      'Each page opens a runnable Python calculator script with editable constants and plain-text output.',
    popularSlugs: [
      'mortgage-calculator',
      'compound-interest-calculator',
      'retirement-calculator',
      'loan-calculator',
      'payment-calculator',
      'credit-card-calculator',
    ],
  },
  [MATH_EXAMPLE_ROUTE_PREFIX]: {
    pageGroup: 'Math',
    heading: 'Math calculator Python scripts',
    title: 'Math Calculators in Python | SharePython.com',
    description:
      'Browse browser-run math calculator Python scripts for percentage, exponents, fractions, statistics, geometry, probability, and more.',
    intro:
      'Each page opens a runnable Python math script that stays explicit about formulas and assumptions.',
    popularSlugs: [
      'percentage-calculator',
      'exponent-calculator',
      'fraction-calculator',
      'standard-deviation-calculator',
      'area-calculator',
      'triangle-calculator',
    ],
  },
  [HEALTH_EXAMPLE_ROUTE_PREFIX]: {
    pageGroup: 'Health',
    heading: 'Health calculator Python scripts',
    title: 'Health Calculators in Python | SharePython.com',
    description:
      'Browse browser-run health and fitness calculator Python scripts for BMI, calories, macros, pace, pregnancy dates, and related wellness estimates.',
    intro:
      'Each page opens a runnable health calculator script with editable assumptions and plainly stated estimate formulas.',
    popularSlugs: [
      'bmi-calculator',
      'calorie-calculator',
      'pace-calculator',
      'macro-calculator',
      'tdee-calculator',
      'target-heart-rate-calculator',
    ],
  },
};

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

function buildAllDefinitions(sourceDefinitions) {
  return [
    ...sourceDefinitions,
    ...buildGeneratedFinancialExamples(),
    ...buildGeneratedMathExamples(),
    ...buildGeneratedHealthExamples(),
  ];
}

function validateHeaderComment(exampleId, script) {
  const headerLines = script
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .slice(0, 5);

  if (headerLines.length < 5 || headerLines.some((line) => !line.trim().startsWith('#'))) {
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
  return segments.length === 0 ? './' : '../'.repeat(segments.length);
}

function normalizePagePath(pagePath = '/') {
  if (!pagePath.startsWith('/')) {
    return `/${pagePath}`;
  }

  return pagePath.endsWith('/') ? pagePath : `${pagePath}/`;
}

function buildAbsolutePageUrl(pagePath) {
  return new URL(normalizePagePath(pagePath), `${siteOrigin}/`).toString();
}

function extractRoutePrefix(pagePath) {
  return normalizePagePath(pagePath).split('/').filter(Boolean)[0] ?? '';
}

function extractCollectionPath(routePrefix) {
  return `/${routePrefix}/`;
}

function applyMetaContent(html, property, value) {
  const escapedValue = escapeHtml(value);
  return html.replace(
    new RegExp(`(<meta\\s+(?:name|property)="${property}"\\s+content=")[^"]*("\\s*\\/?>)`),
    `$1${escapedValue}$2`,
  );
}

function applyLinkHref(html, rel, href) {
  const escapedHref = escapeHtml(href);
  return html.replace(
    new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*("\\s*\\/?>)`),
    `$1${escapedHref}$2`,
  );
}

function applyStructuredData(html, data) {
  return html.replace(
    /(<script id="structured-data" type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
    `$1${JSON.stringify(data, null, 2)}$2`,
  );
}

function buildBreadcrumbStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildExampleStructuredData(example) {
  const pageUrl = buildAbsolutePageUrl(example.pagePath);
  const collectionPrefix = extractRoutePrefix(example.pagePath);
  const collectionMetadata = routeCollectionMetadata[collectionPrefix];
  const collectionUrl = buildAbsolutePageUrl(extractCollectionPath(collectionPrefix));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: example.title,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      url: pageUrl,
      description: example.seoDescription ?? example.summary,
      keywords: example.tags.join(', '),
      creator: {
        '@type': 'Organization',
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/',
      },
      isPartOf: {
        '@type': 'CollectionPage',
        name: collectionMetadata?.title ?? 'Calculator scripts',
        url: collectionUrl,
      },
    },
    buildBreadcrumbStructuredData([
      { name: 'SharePython.com', url: `${siteOrigin}/` },
      {
        name: collectionMetadata?.heading ?? 'Calculator scripts',
        url: collectionUrl,
      },
      { name: example.title, url: pageUrl },
    ]),
  ];
}

function buildHubStructuredData(routePrefix, metadata, examples) {
  const pageUrl = buildAbsolutePageUrl(extractCollectionPath(routePrefix));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: metadata.heading,
      description: metadata.description,
      url: pageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'SharePython.com',
        url: `${siteOrigin}/`,
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: examples.map((example, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: example.title,
          url: buildAbsolutePageUrl(example.pagePath),
        })),
      },
    },
    buildBreadcrumbStructuredData([
      { name: 'SharePython.com', url: `${siteOrigin}/` },
      { name: metadata.heading, url: pageUrl },
    ]),
  ];
}

function buildWebsiteStructuredData(examples) {
  const routeExamples = examples.filter((example) => example.pagePath);
  const groupedExamples = [...routeExamples]
    .reduce((groups, example) => {
      const groupName =
        example.pageGroup ??
        routeCollectionMetadata[extractRoutePrefix(example.pagePath)]?.pageGroup ??
        'Examples';
      const collection = groups.get(groupName) ?? [];
      collection.push(example);
      groups.set(groupName, collection);
      return groups;
    }, new Map());
  const routeExamplesBySlug = new Map(
    routeExamples.map((example) => [example.routeSlug, example]),
  );
  const popularExamples = [];
  const seenPopularSlugs = new Set();

  for (const routePrefix of EXAMPLE_ROUTE_PREFIXES) {
    const metadata = routeCollectionMetadata[routePrefix];

    for (const slug of metadata?.popularSlugs ?? []) {
      if (seenPopularSlugs.has(slug)) {
        continue;
      }

      const example = routeExamplesBySlug.get(slug);
      if (!example) {
        continue;
      }

      seenPopularSlugs.add(slug);
      popularExamples.push(example);
    }
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SharePython.com',
      url: `${siteOrigin}/`,
      description:
        'Run small Python scripts in your browser with no sign-in, plain-text output, and shareable prefilled links.',
      publisher: {
        '@type': 'Organization',
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/',
      },
      hasPart: [...groupedExamples.entries()].map(([groupName, groupExamples]) => ({
        '@type': 'CollectionPage',
        name: `${groupName} calculator scripts`,
        url: buildAbsolutePageUrl(extractCollectionPath(extractRoutePrefix(groupExamples[0].pagePath))),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Popular calculator scripts',
      itemListElement: (popularExamples.length > 0 ? popularExamples : routeExamples.slice(0, 12))
        .map((example, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: example.title,
          url: buildAbsolutePageUrl(example.pagePath),
        })),
    },
  ];
}

function buildHomePageHtml(template, examples) {
  return applyStructuredData(template, buildWebsiteStructuredData(examples));
}

function buildRoutePageHtml(template, example) {
  const relativeRootPath = buildRelativeRootPath(example.pagePath);
  const title = example.seoTitle ?? `${example.title} | SharePython.com`;
  const description =
    example.seoDescription ??
    `${example.summary} Edit the Python script and run it in your browser with no sign-in.`;
  const pageUrl = buildAbsolutePageUrl(example.pagePath);

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = applyMetaContent(html, 'description', description);
  html = applyMetaContent(html, 'og:title', title);
  html = applyMetaContent(html, 'og:description', description);
  html = applyMetaContent(html, 'og:url', pageUrl);
  html = applyMetaContent(html, 'twitter:title', title);
  html = applyMetaContent(html, 'twitter:description', description);
  html = applyLinkHref(html, 'canonical', pageUrl);
  html = applyLinkHref(html, 'license', `${relativeRootPath}LICENSE`);
  html = applyStructuredData(html, buildExampleStructuredData(example));
  html = html.replace(
    '<script type="module" src="./src/main.js"></script>',
    `<script type="module" src="${relativeRootPath}src/main.js"></script>`,
  );
  html = html.replace('<body>', `<body data-route-example-id="${escapeHtml(example.id)}">`);
  return html;
}

function buildRouteHubPage(routePrefix, metadata, examples) {
  const groupedExamples = examples.reduce((groups, example) => {
    const collection = groups.get(example.pageSection ?? example.category) ?? [];
    collection.push(example);
    groups.set(example.pageSection ?? example.category, collection);
    return groups;
  }, new Map());

  const popularExamples = metadata.popularSlugs
    .map((slug) => examples.find((example) => example.routeSlug === slug))
    .filter(Boolean);

  const popularMarkup = popularExamples
    .map(
      (example) => `
            <li>
              <a href="./${escapeHtml(example.routeSlug)}/">${escapeHtml(example.title)}</a>
            </li>`,
    )
    .join('');

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

  const pageUrl = buildAbsolutePageUrl(extractCollectionPath(routePrefix));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:site_name" content="SharePython.com" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta
      name="robots"
      content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
    />
    <link rel="canonical" href="${escapeHtml(pageUrl)}" />
    <script id="structured-data" type="application/ld+json">${JSON.stringify(
      buildHubStructuredData(routePrefix, metadata, examples),
      null,
      2,
    )}</script>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #f5f6f7;
        --surface: #ffffff;
        --text: #0a0a23;
        --muted: #3b3b4f;
        --border: #d0d0d5;
        --accent: #002ead;
        --accent-strong: #0a0a23;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0a0a23;
          --surface: #1b1b32;
          --text: #f5f6f7;
          --muted: #d0d0d5;
          --border: #3b3b4f;
          --accent: #99c9ff;
          --accent-strong: #f1be32;
        }
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font: 400 16px/1.5 Lato, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: var(--bg);
        color: var(--text);
      }

      main {
        max-width: 1160px;
        margin: 0 auto;
        padding: 28px 20px 64px;
      }

      h1,
      h2,
      p,
      ul {
        margin: 0;
      }

      .hub-header {
        display: grid;
        gap: 10px;
        margin-bottom: 24px;
      }

      .hub-header a {
        width: fit-content;
        padding: 8px 12px;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text);
        text-decoration: none;
      }

      .hub-popular {
        margin: 0 0 24px;
        padding: 16px 18px;
        border: 1px solid var(--border);
        background: var(--surface);
      }

      .hub-popular h2 {
        margin-bottom: 10px;
        font-size: 1rem;
      }

      .hub-popular ul,
      .hub-list {
        list-style: none;
        padding: 0;
      }

      .hub-popular ul {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 18px;
      }

      .hub-grid {
        display: grid;
        gap: 18px;
      }

      .hub-section {
        padding: 16px 18px;
        border: 1px solid var(--border);
        background: var(--surface);
      }

      .hub-section h2 {
        margin-bottom: 12px;
        font-size: 1.02rem;
      }

      .hub-list {
        display: grid;
        gap: 12px;
      }

      .hub-list a,
      .hub-popular a {
        color: var(--accent);
        font-weight: 700;
        text-decoration: none;
      }

      .hub-list p {
        margin-top: 2px;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main>
      <header class="hub-header">
        <a href="../">Open the runner</a>
        <h1>${escapeHtml(metadata.heading)}</h1>
        <p>${escapeHtml(metadata.intro)}</p>
      </header>
      <section class="hub-popular">
        <h2>Popular scripts</h2>
        <ul>${popularMarkup}
        </ul>
      </section>
      <div class="hub-grid">
${sections}
      </div>
    </main>
  </body>
</html>
`;
}

async function writeSiteMapFiles(examples) {
  const routePaths = examples
    .filter((example) => example.pagePath)
    .map((example) => normalizePagePath(example.pagePath));
  const collectionPaths = [
    ...new Set(routePaths.map((pagePath) => extractCollectionPath(extractRoutePrefix(pagePath)))),
  ];
  const allPaths = ['/', ...collectionPaths, ...routePaths];
  const lastModifiedDate = new Date().toISOString().slice(0, 10);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .sort()
  .map((pagePath) => {
    const priority =
      pagePath === '/' ? '1.0' : collectionPaths.includes(pagePath) ? '0.9' : '0.7';
    const changeFrequency = pagePath === '/' ? 'weekly' : 'monthly';

    return `  <url>
    <loc>${buildAbsolutePageUrl(pagePath)}</loc>
    <lastmod>${lastModifiedDate}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;

  await mkdir(publicRoot, { recursive: true });
  await writeFile(sitemapPath, sitemap, 'utf8');
  await writeFile(robotsPath, robots, 'utf8');
}

export async function loadExampleDefinitions(sourcePath = manifestSourcePath) {
  return toDefinitionArray(JSON.parse(await readFile(sourcePath, 'utf8')));
}

export function validateExampleDefinitions(definitions, scriptMap) {
  const seenIds = new Set();
  const seenPagePaths = new Set();

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

    if (definition.pagePath) {
      const normalizedPagePath = normalizePagePath(definition.pagePath);

      if (seenPagePaths.has(normalizedPagePath)) {
        throw new Error(`Duplicate page path "${normalizedPagePath}".`);
      }

      seenPagePaths.add(normalizedPagePath);
    }

    return {
      ...definition,
      pagePath: definition.pagePath ? normalizePagePath(definition.pagePath) : definition.pagePath,
      script,
    };
  });
}

export async function generateRoutePages(examples, template) {
  const routeExamples = examples.filter((example) => example.pagePath && example.routeSlug);

  if (routeExamples.length === 0) {
    return [];
  }

  for (const routePrefix of EXAMPLE_ROUTE_PREFIXES) {
    await rm(path.join(repoRoot, routePrefix), { recursive: true, force: true });
  }

  const pageWrites = routeExamples.map(async (example) => {
    const relativePagePath = normalizePagePath(example.pagePath).replace(/^\//, '');
    const outputPath = path.join(repoRoot, relativePagePath, 'index.html');
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, buildRoutePageHtml(template, example), 'utf8');
    return outputPath;
  });

  const examplesByRoutePrefix = routeExamples.reduce((groups, example) => {
    const routePrefix = extractRoutePrefix(example.pagePath);
    const collection = groups.get(routePrefix) ?? [];
    collection.push(example);
    groups.set(routePrefix, collection);
    return groups;
  }, new Map());

  for (const [routePrefix, routeGroupExamples] of examplesByRoutePrefix.entries()) {
    const metadata = routeCollectionMetadata[routePrefix];
    if (!metadata) {
      continue;
    }

    const hubPath = path.join(repoRoot, routePrefix, 'index.html');
    await mkdir(path.dirname(hubPath), { recursive: true });
    await writeFile(
      hubPath,
      buildRouteHubPage(
        routePrefix,
        metadata,
        routeGroupExamples.slice().sort((left, right) => left.title.localeCompare(right.title)),
      ),
      'utf8',
    );
  }

  return Promise.all(pageWrites);
}

export async function writeExamplePagesManifest(examples, outputPath = generatedPageManifestPath) {
  const routeExamples = examples
    .filter((example) => example.routeSlug && example.pagePath)
    .map((example) => ({
      exampleId: example.id,
      title: example.title,
      routeSlug: example.routeSlug,
      pagePath: example.pagePath,
      pageGroup: example.pageGroup ?? null,
      pageSection: example.pageSection ?? example.category,
      seoTitle: example.seoTitle,
      seoDescription: example.seoDescription,
    }));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `export const examplePages = ${JSON.stringify(routeExamples, null, 2)};\n`,
    'utf8',
  );
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
    const template = buildHomePageHtml(await readFile(rootTemplatePath, 'utf8'), manifest);
    await writeFile(rootTemplatePath, template, 'utf8');
    await generateRoutePages(manifest, template);
    await writeSiteMapFiles(manifest);
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
