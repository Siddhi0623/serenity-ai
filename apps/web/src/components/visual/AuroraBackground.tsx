import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Calm ambient backdrop. Three soft radial gradients drift slowly and respond
 * to the current mood via CSS variables (--color-aurora-1/2/3).
 *
 * Performance-conscious: GPU-accelerated transforms only, no filters in motion.
 */
export function AuroraBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-aurora opacity-60" />
      {!reduced && (
        <>
          <motion.div
            className="absolute -left-32 -top-32 h-[42rem] w-[42rem] rounded-full bg-aurora1/30 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full bg-aurora2/30 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-aurora3/25 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
      {/* subtle grain to take the digital sheen off */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
