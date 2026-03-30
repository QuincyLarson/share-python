const FAST_RUNTIME_ONLY_DENYLIST = new Set([
  'pyodide',
  'micropip',
  'requests',
  'socket',
  'ssl',
  'urllib',
  'webbrowser',
  'js',
]);

const FULL_RUNTIME_CANDIDATE_MODULES = new Set([
  'datetime',
  'decimal',
  'fractions',
  'pathlib',
  'statistics',
  'textwrap',
  'zoneinfo',
]);

const FULL_RUNTIME_SIGNATURES = [
  'not implemented',
  'unsupported operation',
  'unsupported feature',
  'module not found',
  'cannot import name',
];

export function detectUnsupportedInput(source) {
  return /\binput\s*\(/.test(source);
}

export function detectBlockedModuleImport(source) {
  const matches = source.matchAll(/^\s*(?:from|import)\s+([a-zA-Z0-9_\.]+)/gm);

  for (const match of matches) {
    const rootModule = match[1].split('.')[0];
    if (FAST_RUNTIME_ONLY_DENYLIST.has(rootModule)) {
      return rootModule;
    }
  }

  return null;
}

export function classifyExecutionError(errorLike) {
  const message = [errorLike?.name, errorLike?.message, errorLike?.traceback]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (message.includes('input(') || message.includes('input is not supported')) {
    return {
      kind: 'unsupported-input',
      offerFullRuntime: false,
      userMessage:
        'Interactive input is not supported in v1. Edit variables directly in the script instead.',
    };
  }

  if (
    message.includes('syntaxerror') ||
    message.includes('nameerror') ||
    message.includes('typeerror') ||
    message.includes('indexerror') ||
    message.includes('keyerror') ||
    message.includes('assertionerror')
  ) {
    return {
      kind: 'user-code-error',
      offerFullRuntime: false,
      userMessage: null,
    };
  }

  const missingModuleMatch = message.match(
    /(?:(?:modulenotfounderror|importerror)[:\s]+)?no module named ['"]([^'"]+)['"]/,
  );
  if (missingModuleMatch) {
    const missingModule = missingModuleMatch[1].split('.')[0];
    return {
      kind: 'missing-module',
      offerFullRuntime: FULL_RUNTIME_CANDIDATE_MODULES.has(missingModule),
      userMessage: null,
    };
  }

  const offerFullRuntime = FULL_RUNTIME_SIGNATURES.some((signature) =>
    message.includes(signature),
  );

  return {
    kind: offerFullRuntime ? 'runtime-incompatibility' : 'unknown-error',
    offerFullRuntime,
    userMessage: null,
  };
}
