import helloRunnerSource from '../examples/getting-started/hello-runner.py?raw';
import mortgagePaymentSource from '../examples/finance/mortgage-payment.py?raw';
import timezoneDeadlineSource from '../examples/time/timezone-deadline.py?raw';
import jsonPrettyPrinterSource from '../examples/data/json-pretty-printer.py?raw';

export const EXAMPLES = [
  {
    id: 'hello-runner',
    title: 'Hello Runner',
    category: 'Getting started',
    summary: 'A tiny comment-rich script that is obviously safe to edit.',
    tags: ['starter', 'basics', 'print'],
    runtime: 'fast',
    difficulty: 'beginner',
    description:
      'Introduces the editing model with a few variables near the top and plain terminal output.',
    issueContext: 'Starter example for the default landing experience.',
    featured: true,
    source: helloRunnerSource,
  },
  {
    id: 'mortgage-payment',
    title: 'Mortgage Payment Calculator',
    category: 'Money & loans',
    summary: 'Estimate a monthly mortgage payment with transparent assumptions.',
    tags: ['finance', 'mortgage', 'calculator'],
    runtime: 'fast',
    difficulty: 'beginner',
    description:
      'Learner-friendly calculator that prints monthly payment, total paid, and total interest.',
    issueContext: 'Finance example. Keep the assumptions and caveats explicit.',
    featured: true,
    source: mortgagePaymentSource,
  },
  {
    id: 'timezone-deadline',
    title: 'Time Zone Deadline Converter',
    category: 'Time & timezone',
    summary: 'Convert a deadline into local times for a few cities.',
    tags: ['time', 'timezone', 'schedule'],
    runtime: 'fast',
    difficulty: 'beginner',
    description:
      'Shows how a practical script can keep editable constants up top and print a readable table.',
    issueContext: 'Time-zone example. Keep offsets explicit and note DST limitations.',
    featured: true,
    source: timezoneDeadlineSource,
  },
  {
    id: 'json-pretty-printer',
    title: 'JSON Pretty Printer',
    category: 'Data & text utilities',
    summary: 'Format inline JSON text so it is easier to inspect or share.',
    tags: ['json', 'formatting', 'utilities'],
    runtime: 'fast',
    difficulty: 'beginner',
    description:
      'Demonstrates inline pasted data, safe parsing, and terminal-style text output.',
    issueContext: 'Data utility example. Preserve transparent errors for malformed JSON.',
    featured: false,
    source: jsonPrettyPrinterSource,
  },
];

export function getExampleById(exampleId) {
  return EXAMPLES.find((example) => example.id === exampleId) ?? null;
}

export function validateExampleManifest(examples) {
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
    };
  });
}
