import { describe, expect, it } from 'vitest';
import {
  getNextThemePreference,
  getThemeToggleLabel,
  loadThemePreference,
  resolveThemePreference,
  saveThemePreference,
} from '../../src/theme.js';

function createStorage() {
  const values = new Map();

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

describe('theme preferences', () => {
  it('defaults to system mode when nothing is stored', () => {
    expect(loadThemePreference(createStorage())).toBe('system');
  });

  it('resolves system mode using the browser preference', () => {
    expect(resolveThemePreference('system', true)).toBe('dark');
    expect(resolveThemePreference('system', false)).toBe('light');
  });

  it('cycles through auto, dark, and light modes', () => {
    expect(getNextThemePreference('system')).toBe('dark');
    expect(getNextThemePreference('dark')).toBe('light');
    expect(getNextThemePreference('light')).toBe('system');
  });

  it('persists explicit theme modes and clears system mode', () => {
    const storage = createStorage();

    saveThemePreference('dark', storage);
    expect(loadThemePreference(storage)).toBe('dark');

    saveThemePreference('system', storage);
    expect(loadThemePreference(storage)).toBe('system');
  });

  it('renders compact button labels', () => {
    expect(getThemeToggleLabel('system')).toBe('Theme: Auto');
    expect(getThemeToggleLabel('dark')).toBe('Theme: Dark');
    expect(getThemeToggleLabel('light')).toBe('Theme: Light');
  });
});
