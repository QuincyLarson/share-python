import { examples as generatedExamples } from './generated/examples-manifest.js';
import { normalizeExampleSource } from './starter.js';

export const EXAMPLES = generatedExamples.map((example) => ({
  ...example,
  source: example.script,
}));

const HIDDEN_LIBRARY_EXAMPLE_IDS = new Set(['hello-runner']);
const LIBRARY_TOPIC_ORDER = [
  'Arithmetic',
  'Auto',
  'Data & text utilities',
  'Financial',
  'Fitness',
  'Food & household',
  'Geometry',
  'Health',
  'Investment',
  'Money & loans',
  'Nutrition',
  'Pregnancy',
  'Real Estate',
  'Retirement',
  'Statistics',
  'Tax and Salary',
  'Time & timezone',
];

const examplesById = new Map(EXAMPLES.map((example) => [example.id, example]));
const featuredExamples = EXAMPLES.filter((example) => example.featured);
const collator = new Intl.Collator('en');

export function getExampleLibraryTopic(example) {
  if (example.id === 'gfr-calculator' || example.id === 'bac-calculator') {
    return 'Health';
  }

  const rawTopic = example.pageSection ?? example.category;

  if (rawTopic === 'Mortgage and Real Estate') {
    return 'Real Estate';
  }

  if (rawTopic === 'Other' && example.pageGroup === 'Finance') {
    return 'Financial';
  }

  return rawTopic;
}

function compareLibraryExamples(left, right) {
  const leftTopicIndex = LIBRARY_TOPIC_ORDER.indexOf(getExampleLibraryTopic(left));
  const rightTopicIndex = LIBRARY_TOPIC_ORDER.indexOf(getExampleLibraryTopic(right));
  const normalizedLeftTopicIndex = leftTopicIndex === -1 ? LIBRARY_TOPIC_ORDER.length : leftTopicIndex;
  const normalizedRightTopicIndex =
    rightTopicIndex === -1 ? LIBRARY_TOPIC_ORDER.length : rightTopicIndex;

  if (normalizedLeftTopicIndex !== normalizedRightTopicIndex) {
    return normalizedLeftTopicIndex - normalizedRightTopicIndex;
  }

  return collator.compare(left.title, right.title);
}

// Keep the library order fixed up front so search only filters an already ordered list.
const ORDERED_LIBRARY_EXAMPLES = EXAMPLES.filter(
  (example) => !HIDDEN_LIBRARY_EXAMPLE_IDS.has(example.id),
).slice().sort(compareLibraryExamples);

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
    return ORDERED_LIBRARY_EXAMPLES.slice();
  }

  return ORDERED_LIBRARY_EXAMPLES.filter((example) => {
    const haystack = [
      example.title,
      getExampleLibraryTopic(example),
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
  });
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
