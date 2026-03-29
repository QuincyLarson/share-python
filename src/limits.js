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

  while (getByteLength(`${truncated}\n… output truncated …`) > maxBytes) {
    truncated = truncated.slice(0, -1);
  }

  return `${truncated}\n… output truncated …`;
}

