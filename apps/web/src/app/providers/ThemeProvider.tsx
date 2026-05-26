import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Mood, ThemeMode } from '@/design/tokens';
import {
  MOOD_STORAGE_KEY,
  THEME_STORAGE_KEY,
  ThemeContext,
  type ThemeContextValue,
} from './theme-context';

function readInitialString<T extends string>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(key);
  return (stored as T) ?? fallback;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [mood, setMoodState] = useState<Mood>(() =>
    readInitialString<Mood>(MOOD_STORAGE_KEY, 'calm'),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-mood', mood);
    window.localStorage.setItem(MOOD_STORAGE_KEY, mood);
  }, [mood]);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const setMood = useCallback((m: Mood) => setMoodState(m), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mood, setTheme, setMood, toggleTheme }),
    [theme, mood, setTheme, setMood, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
