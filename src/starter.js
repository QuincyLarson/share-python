export const STARTER_PROMPT = '# Type or paste Python code here';

const STARTER_PREFIX_PATTERN = /^# Type or paste Python code here(?:\r?\n)+/;

export function buildStarterSource(exampleSource) {
  return `${STARTER_PROMPT}\n\n${stripStarterPrompt(exampleSource).trimStart()}`;
}

export function stripStarterPrompt(sourceText = '') {
  return sourceText.replace(STARTER_PREFIX_PATTERN, '');
}

export function normalizeExampleSource(sourceText = '') {
  return stripStarterPrompt(sourceText).replace(/\r\n/g, '\n');
}
