import { APP_CONFIG } from './config.js';

const VALID_THEME_PREFERENCES = new Set(['light', 'dark']);

function sanitizeThemePreference(themePreference) {
  return VALID_THEME_PREFERENCES.has(themePreference) ? themePreference : null;
}

export function loadThemePreference(storage = globalThis.localStorage) {
  if (!storage) {
    return null;
  }

  try {
    return sanitizeThemePreference(storage.getItem(APP_CONFIG.themeStorageKey));
  } catch {
    return null;
  }
}

export function saveThemePreference(themePreference, storage = globalThis.localStorage) {
  if (!storage) {
    return;
  }

  const sanitizedPreference = sanitizeThemePreference(themePreference);

  try {
    if (!sanitizedPreference) {
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
  return sanitizedPreference ?? (systemPrefersDark ? 'dark' : 'light');
}

export function getNextThemePreference(themePreference, systemPrefersDark = false) {
  return resolveThemePreference(themePreference, systemPrefersDark) === 'dark' ? 'light' : 'dark';
}

export function getThemeToggleLabel(themePreference, systemPrefersDark = false) {
  return resolveThemePreference(themePreference, systemPrefersDark) === 'dark'
    ? 'Night mode'
    : 'Day mode';
}
