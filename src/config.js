export const APP_CONFIG = {
  appVersion: '0.1.0',
  appName: 'freeCodeCamp Python Runner',
  repoUrl: 'https://github.com/QuincyLarson/share-python',
  issueBaseUrl: 'https://github.com/QuincyLarson/share-python/issues/new',
  donationUrl: 'https://www.freecodecamp.org/donate/',
  storageKey: 'share-python:draft:v1',
  shareVersion: '1',
  defaultExampleId: 'hello-runner',
  maxSourceSize: 64 * 1024,
  maxShareUrlLength: 2000,
  maxOutputBytes: 256 * 1024,
  fastTimeoutMs: 5000,
  fullTimeoutMs: 15000,
};

export const FOUNDATION_OUTPUT = [
  'Ready to run.',
  '',
  'Output from each run will appear here.',
  'Shared scripts are prefills only and never autorun.',
].join('\n');
