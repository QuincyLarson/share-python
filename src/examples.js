import { examples as generatedExamples } from './generated/examples-manifest.js';
import { normalizeExampleSource } from './starter.js';

export const EXAMPLES = generatedExamples.map((example) => ({
  ...example,
  source: example.script,
}));
export const EXAMPLE_GROUP_ORDER = [
  'Finance',
  'Math',
  'Health',
  'Time',
  'Utilities',
  'Everyday',
  'Basics',
];

const examplesById = new Map(EXAMPLES.map((example) => [example.id, example]));
const featuredExamples = EXAMPLES.filter((example) => example.featured);

function inferExampleGroup(example) {
  if (example.pageGroup) {
    return example.pageGroup;
  }

  if (example.pagePath?.startsWith('/financial-calculators/')) {
    return 'Finance';
  }

  if (example.pagePath?.startsWith('/math-calculators/')) {
    return 'Math';
  }

  if (example.pagePath?.startsWith('/health-calculators/')) {
    return 'Health';
  }

  if (/getting started/i.test(example.category)) {
    return 'Basics';
  }

  if (/time/i.test(example.category)) {
    return 'Time';
  }

  if (/data|text/i.test(example.category)) {
    return 'Utilities';
  }

  if (/food|household/i.test(example.category)) {
    return 'Everyday';
  }

  if (/health/i.test(example.category)) {
    return 'Health';
  }

  if (/money|loan|finance/i.test(example.category)) {
    return 'Finance';
  }

  return 'Utilities';
}

function sortExamples(left, right) {
  const leftGroupIndex = EXAMPLE_GROUP_ORDER.indexOf(inferExampleGroup(left));
  const rightGroupIndex = EXAMPLE_GROUP_ORDER.indexOf(inferExampleGroup(right));
  const normalizedLeftGroupIndex = leftGroupIndex === -1 ? EXAMPLE_GROUP_ORDER.length : leftGroupIndex;
  const normalizedRightGroupIndex =
    rightGroupIndex === -1 ? EXAMPLE_GROUP_ORDER.length : rightGroupIndex;

  if (normalizedLeftGroupIndex !== normalizedRightGroupIndex) {
    return normalizedLeftGroupIndex - normalizedRightGroupIndex;
  }

  const sectionCompare = (left.pageSection ?? left.category).localeCompare(
    right.pageSection ?? right.category,
  );

  if (sectionCompare !== 0) {
    return sectionCompare;
  }

  return left.title.localeCompare(right.title);
}

export function getExampleById(exampleId) {
  return examplesById.get(exampleId) ?? null;
}

export const findExampleById = getExampleById;

export function findMatchingExampleBySource(sourceText) {
  const normalizedSource = normalizeExampleSource(sourceText);
  return EXAMPLES.find((example) => normalizeExampleSource(example.source) === normalizedSource) ?? null;
}

export function getRandomExample(random = Math.random) {
  const pool = featuredExamples.length > 0 ? featuredExamples : EXAMPLES;

  if (pool.length === 0) {
    return null;
  }

  const index = Math.floor(random() * pool.length);
  return pool[index] ?? pool[0];
}

export function filterExamples(searchTerm = '') {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return EXAMPLES.slice().sort(sortExamples);
  }

  return EXAMPLES.filter((example) => {
    const haystack = [
      example.title,
      inferExampleGroup(example),
      example.category,
      example.pageSection ?? '',
      example.routeSlug ?? '',
      example.pagePath ?? '',
      example.summary,
      example.description,
      ...example.tags,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  }).sort(sortExamples);
}

export function groupExamples(searchTerm = '') {
  const groups = new Map();

  for (const example of filterExamples(searchTerm)) {
    const groupName = inferExampleGroup(example);
    const collection = groups.get(groupName) ?? [];
    collection.push(example);
    groups.set(groupName, collection);
  }

  return [...groups.entries()].map(([groupName, examples]) => ({
    groupName,
    examples,
  }));
}

export function validateExampleManifest(examples = EXAMPLES) {
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
    'source',
  ];

  return examples.map((example) => {
    const missing = requiredFields.filter((field) => {
      const value = example[field];
      if (Array.isArray(value)) {
        return value.length === 0;
      }

      return typeof value !== 'string' || value.trim() === '';
    });

    return {
      id: example.id,
      missing,
      hasHeaderComment: example.source.trimStart().startsWith('#'),
      hasChecks: Array.isArray(example.checks) && example.checks.length > 0,
    };
  });
}
