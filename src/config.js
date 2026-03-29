export const APP_CONFIG = {
  appName: 'freeCodeCamp Python Runner',
  repoUrl: 'https://github.com/QuincyLarson/share-python',
  issueBaseUrl: 'https://github.com/QuincyLarson/share-python/issues/new',
  donationUrl: 'https://www.freecodecamp.org/donate/',
  storageKey: 'share-python:draft:v1',
  shareVersion: '1',
  defaultExampleId: 'hello-runner',
  maxSourceSize: 64 * 1024,
  maxShareUrlLength: 4000,
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
].join('\n');
