import { examples } from './generated/examples-manifest.js';

const examplesById = new Map(examples.map((example) => [example.id, example]));

export { examples };
export const EXAMPLES = examples;

export function findExampleById(exampleId) {
  return examplesById.get(exampleId) ?? null;
}

export const getExampleById = findExampleById;

export function findMatchingExampleBySource(sourceText) {
  return examples.find((example) => example.script === sourceText) ?? null;
}

export function filterExamples(searchTerm = '') {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return examples;
  }

  return examples.filter((example) => {
    const haystack = [
      example.title,
      example.category,
      example.summary,
      example.description,
      ...example.tags
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}
