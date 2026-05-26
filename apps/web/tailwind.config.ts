import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import {
  palette,
  typography,
  radius,
  shadow,
  motion,
  screens,
  spacing,
  z,
} from './src/design/tokens';

/**
 * Tailwind is wired to CSS variables (defined in src/styles/globals.css)
 * so [data-theme="dark"] and [data-mood="..."] can re-skin the entire app
 * without re-rendering React.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens,
    extend: {
      colors: {
        // Semantic — resolved via CSS vars in globals.css per theme + mood.
        bg: 'hsl(var(--color-bg) / <alpha-value>)',
        surface: 'hsl(var(--color-surface) / <alpha-value>)',
        'surface-2': 'hsl(var(--color-surface-2) / <alpha-value>)',
        fg: 'hsl(var(--color-fg) / <alpha-value>)',
        'fg-muted': 'hsl(var(--color-fg-muted) / <alpha-value>)',
        'fg-subtle': 'hsl(var(--color-fg-subtle) / <alpha-value>)',
        border: 'hsl(var(--color-border) / <alpha-value>)',
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        'primary-fg': 'hsl(var(--color-primary-fg) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        ring: 'hsl(var(--color-ring) / <alpha-value>)',
        // Ambient — used for hero gradients and emotional backgrounds; shifts per mood.
        aurora1: 'hsl(var(--color-aurora-1) / <alpha-value>)',
        aurora2: 'hsl(var(--color-aurora-2) / <alpha-value>)',
        aurora3: 'hsl(var(--color-aurora-3) / <alpha-value>)',
        // Raw brand palette — useful for visual demos / illustrations
        lavender: Object.fromEntries(
          Object.entries(palette.lavender).map(([k, v]) => [k, `hsl(${v} / <alpha-value>)`]),
        ),
        sky: Object.fromEntries(
          Object.entries(palette.sky).map(([k, v]) => [k, `hsl(${v} / <alpha-value>)`]),
        ),
        mint: Object.fromEntries(
          Object.entries(palette.mint).map(([k, v]) => [k, `hsl(${v} / <alpha-value>)`]),
        ),
        peach: Object.fromEntries(
          Object.entries(palette.peach).map(([k, v]) => [k, `hsl(${v} / <alpha-value>)`]),
        ),
        navy: Object.fromEntries(
          Object.entries(palette.navy).map(([k, v]) => [k, `hsl(${v} / <alpha-value>)`]),
        ),
        ink: Object.fromEntries(
          Object.entries(palette.ink).map(([k, v]) => [k, `hsl(${v} / <alpha-value>)`]),
        ),
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
        display: typography.fontFamily.display,
        serif: typography.fontFamily.serif,
      },
      fontSize: typography.fontSize as Record<
        string,
        [string, { lineHeight: string; letterSpacing: string }]
      >,
      fontWeight: typography.fontWeight,
      zIndex: Object.fromEntries(Object.entries(z).map(([k, v]) => [k, String(v)])),
      borderRadius: { ...radius },
      boxShadow: { ...shadow },
      spacing: { ...defaultTheme.spacing, ...spacing },
      transitionTimingFunction: motion.ease,
      transitionDuration: motion.duration,
      backgroundImage: {
        aurora:
          'radial-gradient(60% 60% at 20% 10%, hsl(var(--color-aurora-1) / 0.55), transparent 60%), radial-gradient(45% 45% at 80% 20%, hsl(var(--color-aurora-2) / 0.45), transparent 60%), radial-gradient(50% 60% at 50% 90%, hsl(var(--color-aurora-3) / 0.35), transparent 65%)',
        mesh: 'conic-gradient(from 180deg at 50% 50%, hsl(var(--color-aurora-1) / 0.25), hsl(var(--color-aurora-2) / 0.25), hsl(var(--color-aurora-3) / 0.25), hsl(var(--color-aurora-1) / 0.25))',
      },
      keyframes: {
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-14px) translateX(6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        breath: `breath ${motion.duration.breath} ${motion.ease.breath} infinite`,
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'fade-up': `fade-up ${motion.duration.slow} ${motion.ease.out} both`,
      },
      backdropBlur: {
        glass: '14px',
      },
    },
  },
  plugins: [],
};

export default config;
