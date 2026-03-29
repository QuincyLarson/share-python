export function getByteLength(value) {
  return new TextEncoder().encode(value).byteLength;
}

export function isSourceWithinLimit(sourceText, maxBytes) {
  return getByteLength(sourceText) <= maxBytes;
}

export function truncateOutput(outputText, maxBytes) {
  if (getByteLength(outputText) <= maxBytes) {
    return outputText;
  }

  let truncated = outputText;
  const suffix = '\n... output truncated ...';

  while (truncated && getByteLength(`${truncated}${suffix}`) > maxBytes) {
    truncated = truncated.slice(0, -1);
  }

  return `${truncated}${suffix}`;
}
