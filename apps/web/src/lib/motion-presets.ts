import type { Transition, Variants } from 'framer-motion';
import { motion as motionTokens } from '@/design/tokens';

/**
 * Reusable Framer Motion building blocks.
 *
 * Guidelines:
 *  - Prefer spring physics over tweens for entrances and gestures.
 *  - Keep durations under ~0.7s; longer feels sluggish.
 *  - Reduced-motion users get instant transitions — handled at the source
 *    via the `useMotionPresets()` hook below.
 */

export const springs = motionTokens.spring;

export const easings = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  breath: [0.45, 0, 0.55, 1] as const,
};

/* ---------- Common variants ---------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easings.out } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.out },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easings.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: springs.gentle },
};

export const stagger = (delayChildren = 0.1, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

/* ---------- Page transitions ---------- */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easings.out } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: easings.inOut } },
};

/* ---------- Interactive ---------- */

export const hoverLift = {
  whileHover: { y: -2, transition: springs.snappy },
  whileTap: { y: 0, scale: 0.98, transition: springs.snappy },
};

export const breath: Transition = {
  duration: 4,
  ease: easings.breath,
  repeat: Infinity,
  repeatType: 'mirror',
};
