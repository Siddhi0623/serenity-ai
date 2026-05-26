/**
 * Serenity AI — Design Tokens
 *
 * Single source of truth for the visual language.
 * - Raw values live here.
 * - Tailwind config (tailwind.config.ts) consumes these.
 * - Runtime themes (light/dark + mood variants) live in globals.css as CSS vars.
 *
 * Convention: colors are stored as `H S% L%` strings (no hsl() wrapper) so
 * they compose with hsl(var(--token) / <alpha>) in Tailwind utilities.
 */

export const palette = {
  // Brand — calm, soft, premium
  lavender: { 50: '270 100% 98%', 200: '258 91% 90%', 400: '258 88% 80%', 500: '258 84% 72%', 600: '258 70% 62%' },
  sky:      { 50: '204 100% 97%', 200: '199 95% 87%', 400: '199 89% 74%', 500: '199 85% 60%', 600: '200 78% 48%' },
  mint:     { 50: '160 80% 96%',  200: '160 75% 86%', 400: '160 70% 68%', 500: '160 65% 52%', 600: '160 60% 40%' },
  peach:    { 50: '24 100% 97%',  200: '22 95% 88%',  400: '20 91% 78%',  500: '18 85% 68%',  600: '16 75% 56%' },
  navy:     { 50: '225 30% 96%',  200: '225 30% 80%', 400: '225 28% 40%', 500: '225 30% 20%', 600: '225 36% 14%', 700: '225 42% 10%', 800: '225 45% 7%',  900: '225 50% 5%' },
  ink:      { 50: '0 0% 100%',    100: '220 14% 96%', 200: '220 13% 91%', 300: '216 12% 84%', 400: '218 11% 65%', 500: '220 9% 46%',  600: '215 14% 34%', 700: '217 19% 27%', 800: '215 28% 17%', 900: '222 47% 11%' },
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
    serif: ['Fraunces', 'Georgia', 'serif'],
  },
  // Modular scale — 1.200 (minor third). Mobile-first; scales up at md/lg via Tailwind utilities.
  fontSize: {
    xs: ['0.75rem',  { lineHeight: '1.1rem',  letterSpacing: '0.01em' }],
    sm: ['0.875rem', { lineHeight: '1.35rem', letterSpacing: '0.005em' }],
    base: ['1rem',   { lineHeight: '1.6rem',  letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.005em' }],
    xl: ['1.25rem',  { lineHeight: '1.9rem',  letterSpacing: '-0.01em' }],
    '2xl': ['1.5rem',   { lineHeight: '2.1rem',  letterSpacing: '-0.015em' }],
    '3xl': ['1.875rem', { lineHeight: '2.4rem',  letterSpacing: '-0.02em' }],
    '4xl': ['2.25rem',  { lineHeight: '2.7rem',  letterSpacing: '-0.025em' }],
    '5xl': ['3rem',     { lineHeight: '3.3rem',  letterSpacing: '-0.03em' }],
    '6xl': ['3.75rem',  { lineHeight: '4rem',    letterSpacing: '-0.035em' }],
    '7xl': ['4.5rem',   { lineHeight: '4.7rem',  letterSpacing: '-0.04em' }],
  },
  fontWeight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
} as const;

export const radius = {
  none: '0',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  pill: '9999px',
} as const;

export const shadow = {
  // Soft, premium shadows. Layered for depth without harshness.
  xs: '0 1px 2px 0 hsl(225 45% 7% / 0.04)',
  sm: '0 2px 6px -1px hsl(225 45% 7% / 0.06), 0 1px 2px hsl(225 45% 7% / 0.04)',
  md: '0 6px 16px -4px hsl(225 45% 7% / 0.10), 0 2px 6px hsl(225 45% 7% / 0.06)',
  lg: '0 18px 40px -12px hsl(225 45% 7% / 0.18), 0 4px 10px hsl(225 45% 7% / 0.06)',
  xl: '0 28px 60px -16px hsl(225 45% 7% / 0.25)',
  // Glassmorphism inner glow
  glow: '0 0 0 1px hsl(0 0% 100% / 0.08) inset, 0 8px 32px hsl(258 84% 72% / 0.12)',
  // Focus ring (accessible)
  ring: '0 0 0 3px hsl(var(--color-ring) / 0.45)',
} as const;

export const motion = {
  duration: {
    instant: '80ms',
    fast: '160ms',
    base: '240ms',
    slow: '420ms',
    slower: '680ms',
    breath: '4000ms',
  },
  ease: {
    // Premium-feeling curves. Avoid linear.
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',           // gentle out — for entries
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',        // smooth for state changes
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',    // playful bounce (use sparingly)
    breath: 'cubic-bezier(0.45, 0, 0.55, 1)',       // sine-like, ideal for breathing
  },
  // Framer Motion spring presets (consumed in motion-presets.ts)
  spring: {
    gentle: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.8 },
    snappy: { type: 'spring' as const, stiffness: 300, damping: 28, mass: 0.6 },
    soft:   { type: 'spring' as const, stiffness: 80,  damping: 18, mass: 1 },
  },
} as const;

export const spacing = {
  // Tailwind's defaults are fine; we add a few wellness-friendly larger values.
  '4xs': '0.125rem',
  '3xs': '0.25rem',
  hero: '7.5rem',
  section: '6rem',
} as const;

// Container queries / breakpoints (mobile-first)
export const screens = {
  xs: '380px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const z = {
  base: 0,
  raised: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
  panic: 99,
} as const;

export type ThemeMode = 'light' | 'dark';
export type Mood = 'calm' | 'anxious' | 'sad' | 'happy' | 'overwhelmed';

export const MOODS: readonly Mood[] = ['calm', 'anxious', 'sad', 'happy', 'overwhelmed'] as const;
