import { examples as generatedExamples } from './generated/examples-manifest.js';
import { normalizeExampleSource } from './starter.js';

export const EXAMPLES = generatedExamples.map((example) => ({
  ...example,
  source: example.script,
}));

const examplesById = new Map(EXAMPLES.map((example) => [example.id, example]));

export function getExampleById(exampleId) {
  return examplesById.get(exampleId) ?? null;
}

export const findExampleById = getExampleById;

export function findMatchingExampleBySource(sourceText) {
  const normalizedSource = normalizeExampleSource(sourceText);
  return EXAMPLES.find((example) => normalizeExampleSource(example.source) === normalizedSource) ?? null;
}

export function getRandomExample(random = Math.random) {
  if (EXAMPLES.length === 0) {
    return null;
  }

  const index = Math.floor(random() * EXAMPLES.length);
  return EXAMPLES[index] ?? EXAMPLES[0];
}

export function filterExamples(searchTerm = '') {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return EXAMPLES;
  }

  return EXAMPLES.filter((example) => {
    const haystack = [
      example.title,
      example.category,
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
