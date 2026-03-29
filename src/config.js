export const APP_CONFIG = {
  appVersion: '0.1.0',
  appName: 'freeCodeCamp Python Runner',
  repoUrl: 'https://github.com/QuincyLarson/share-python',
  issueBaseUrl: 'https://github.com/QuincyLarson/share-python/issues/new',
  donationUrl: 'https://www.freecodecamp.org/donate/',
  storageKey: 'share-python:draft:v1',
  shareVersion: '1',
  defaultExampleId: 'mortgage-payment',
  maxSourceSize: 64 * 1024,
  maxShareUrlLength: 2000,
  maxOutputBytes: 256 * 1024,
  fastTimeoutMs: 5000,
  fullTimeoutMs: 15000,
};

export const FOUNDATION_OUTPUT = [
  'Execution worker wiring lands in the next atomic commit.',
  '',
  'What is ready now:',
  '- starter scripts and example picker',
  '- local draft restore',
  '- share-link encoding and decoding',
  '- issue-report link generation',
  '',
  'No code from the URL fragment will run until you click Run.',
].join('\n');
