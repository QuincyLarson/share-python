import { APP_CONFIG } from './config.js';

const VALID_THEME_PREFERENCES = new Set(['system', 'light', 'dark']);

function sanitizeThemePreference(themePreference) {
  return VALID_THEME_PREFERENCES.has(themePreference) ? themePreference : 'system';
}

export function loadThemePreference(storage = globalThis.localStorage) {
  if (!storage) {
    return 'system';
  }

  try {
    return sanitizeThemePreference(storage.getItem(APP_CONFIG.themeStorageKey));
  } catch {
    return 'system';
  }
}

export function saveThemePreference(themePreference, storage = globalThis.localStorage) {
  if (!storage) {
    return;
  }

  const sanitizedPreference = sanitizeThemePreference(themePreference);

  try {
    if (sanitizedPreference === 'system') {
      storage.removeItem(APP_CONFIG.themeStorageKey);
      return;
    }

    storage.setItem(APP_CONFIG.themeStorageKey, sanitizedPreference);
  } catch {
    // Theme preferences are a convenience and should never block the app.
  }
}

export function resolveThemePreference(themePreference, systemPrefersDark = false) {
  const sanitizedPreference = sanitizeThemePreference(themePreference);
  return sanitizedPreference === 'system'
    ? systemPrefersDark
      ? 'dark'
      : 'light'
    : sanitizedPreference;
}

export function getNextThemePreference(themePreference) {
  const sanitizedPreference = sanitizeThemePreference(themePreference);

  if (sanitizedPreference === 'system') {
    return 'dark';
  }

  if (sanitizedPreference === 'dark') {
    return 'light';
  }

  return 'system';
}

export function getThemeToggleLabel(themePreference) {
  const sanitizedPreference = sanitizeThemePreference(themePreference);

  if (sanitizedPreference === 'system') {
    return 'Theme: Auto';
  }

  return `Theme: ${sanitizedPreference === 'dark' ? 'Dark' : 'Light'}`;
}
