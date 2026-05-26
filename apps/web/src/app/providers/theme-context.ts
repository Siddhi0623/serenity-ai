import { createContext } from 'react';
import type { Mood, ThemeMode } from '@/design/tokens';

export type ThemeContextValue = {
  theme: ThemeMode;
  mood: Mood;
  setTheme: (t: ThemeMode) => void;
  setMood: (m: Mood) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const THEME_STORAGE_KEY = 'serenity:theme';
export const MOOD_STORAGE_KEY = 'serenity:mood';
