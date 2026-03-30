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
  it('defaults to the system preference when nothing is stored', () => {
    expect(loadThemePreference(createStorage())).toBeNull();
  });

  it('resolves the initial mode using the browser preference', () => {
    expect(resolveThemePreference(null, true)).toBe('dark');
    expect(resolveThemePreference(null, false)).toBe('light');
  });

  it('toggles between dark and light modes', () => {
    expect(getNextThemePreference(null, true)).toBe('light');
    expect(getNextThemePreference('dark')).toBe('light');
    expect(getNextThemePreference('light')).toBe('dark');
  });

  it('persists explicit theme modes and clears the initial auto-detected mode', () => {
    const storage = createStorage();

    saveThemePreference('dark', storage);
    expect(loadThemePreference(storage)).toBe('dark');

    saveThemePreference(null, storage);
    expect(loadThemePreference(storage)).toBeNull();
  });

  it('renders compact button labels', () => {
    expect(getThemeToggleLabel(null, true)).toBe('Night mode');
    expect(getThemeToggleLabel('dark')).toBe('Night mode');
    expect(getThemeToggleLabel('light')).toBe('Day mode');
  });
});
