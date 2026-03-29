import { APP_CONFIG } from './config.js';
import { isSourceWithinLimit } from './limits.js';

const blockedPatterns = [
  {
    code: 'interactive_input',
    pattern: /\binput\s*\(/i,
    message: 'Interactive input is not supported in v1. Edit variables directly in the script instead.',
  },
  {
    code: 'package_install',
    pattern: /\b(micropip|pip)\b/i,
    message: 'Package installation is disabled in this runner.',
  },
  {
    code: 'network_access',
    pattern: /\b(requests|urllib|socket|websocket|httpx)\b|(^|\s)(from|import)\s+js\b/i,
    message: 'Network access is disabled. Paste data directly into the script instead.',
  },
  {
    code: 'rich_output',
    pattern: /\b(matplotlib|pillow|PIL|seaborn|plotly)\b/i,
    message: 'Images and rich output are outside the scope of this runner.',
  },
];

export function validateSourcePolicy(
  sourceText,
  { maxSourceSize = APP_CONFIG.maxSourceSize } = {},
) {
  if (!isSourceWithinLimit(sourceText, maxSourceSize)) {
    return {
      ok: false,
      code: 'source_too_large',
      message: `This script is larger than the current ${Math.floor(maxSourceSize / 1024)} KB source limit.`,
    };
  }

  for (const rule of blockedPatterns) {
    if (rule.pattern.test(sourceText)) {
      return {
        ok: false,
        code: rule.code,
        message: rule.message,
      };
    }
  }

  return {
    ok: true,
  };
}

