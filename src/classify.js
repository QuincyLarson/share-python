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
  '__future__',
  'dataclasses',
  'datetime',
  'decimal',
  'fractions',
  'pathlib',
  'statistics',
  'textwrap',
  'typing',
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

function collectImportedRootModules(source) {
  const modules = [];
  const lines = source.split(/\r?\n/);

  for (const line of lines) {
    const importMatch = line.match(/^\s*import\s+(.+)$/);
    if (importMatch) {
      for (const specifier of importMatch[1].split(',')) {
        const moduleName = specifier.trim().split(/\s+as\s+/i)[0];
        if (moduleName) {
          modules.push(moduleName.split('.')[0]);
        }
      }
      continue;
    }

    const fromMatch = line.match(/^\s*from\s+([a-zA-Z0-9_\.]+)\s+import\b/);
    if (fromMatch) {
      modules.push(fromMatch[1].split('.')[0]);
    }
  }

  return modules;
}

export function detectBlockedModuleImport(source) {
  for (const rootModule of collectImportedRootModules(source)) {
    if (FAST_RUNTIME_ONLY_DENYLIST.has(rootModule)) {
      return rootModule;
    }
  }

  return null;
}

export function detectPreferredRuntime(source) {
  for (const rootModule of collectImportedRootModules(source)) {
    if (FULL_RUNTIME_CANDIDATE_MODULES.has(rootModule)) {
      return 'full';
    }
  }

  return 'fast';
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
