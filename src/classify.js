const ordinaryBugPatterns = [
  /syntaxerror/i,
  /nameerror/i,
  /typeerror/i,
  /indexerror/i,
  /keyerror/i,
  /assertionerror/i
];

const unsupportedRuntimePatterns = [
  /modulenotfounderror/i,
  /importerror/i,
  /not implemented/i,
  /unsupported/i,
  /unimplemented/i,
  /no module named/i
];

const disallowedCapabilityPatterns = [
  /\binput\(/i,
  /pip install/i,
  /micropip/i,
  /\brequests\b/i,
  /\burllib\b/i,
  /\bfetch\b/i,
  /\bwebsocket\b/i,
  /matplotlib/i,
  /\bpillow\b/i,
  /image/i
];

export function classifyRuntimeFailure({ name = '', message = '', stderr = '' }) {
  const combined = `${name}\n${message}\n${stderr}`;

  if (disallowedCapabilityPatterns.some((pattern) => pattern.test(combined))) {
    return {
      shouldOfferFullRuntime: false,
      reason: 'disallowed_capability'
    };
  }

  if (ordinaryBugPatterns.some((pattern) => pattern.test(combined))) {
    return {
      shouldOfferFullRuntime: false,
      reason: 'ordinary_bug'
    };
  }

  if (unsupportedRuntimePatterns.some((pattern) => pattern.test(combined))) {
    return {
      shouldOfferFullRuntime: true,
      reason: 'runtime_incompatibility'
    };
  }

  return {
    shouldOfferFullRuntime: false,
    reason: 'unknown'
  };
}

