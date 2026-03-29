import { APP_CONFIG } from './config.js';

export function buildIssueUrl({ currentUrl, example, runtimeHint, isCustomScript }) {
  const title = example
    ? `[Example] ${example.title}`
    : '[Tool] Browser Python runner feedback';

  const bodySections = [
    '## Context',
    '',
    `- Example: ${example ? `${example.title} (\`${example.id}\`)` : 'ad-hoc script'}`,
    `- Runtime hint: ${runtimeHint ?? 'unknown'}`,
    `- Share URL: ${currentUrl}`,
  ];

  if (isCustomScript) {
    bodySections.push(
      '',
      '> Warning: this report may expose the current script contents through the shared URL.',
    );
  }

  if (example?.issueContext) {
    bodySections.push('', '## Example notes', '', example.issueContext);
  }

  const params = new URLSearchParams({
    title,
    body: bodySections.join('\n'),
  });

  return `${APP_CONFIG.issueBaseUrl}?${params.toString()}`;
}
