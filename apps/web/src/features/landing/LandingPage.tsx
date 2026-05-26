import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Waves } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { fadeUp, pageTransition, stagger } from '@/lib/motion-presets';
import { MOODS, type Mood } from '@/design/tokens';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/cn';

const MOOD_TONE: Record<Mood, string> = {
  calm: 'soft lavender + sky',
  anxious: 'low-saturation mint',
  sad: 'warm peach + amber',
  happy: 'bright peach + sun',
  overwhelmed: 'ultra-muted neutral',
};

export function LandingPage() {
  const { t } = useTranslation();
  const { mood, setMood } = useTheme();

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center"
    >
      {/* Hero */}
      <motion.div
        variants={stagger(0.15, 0.12)}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl pt-12 text-center sm:pt-20"
      >
        <motion.div variants={fadeUp} className="mb-6 flex justify-center">
          <span className="glass text-fg-muted inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <Sparkles className="text-primary h-3.5 w-3.5" />
            {t('hero.eyebrow', 'Mental wellness, beautifully designed')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-fg text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t('hero.titleA', 'Quiet your mind.')}
          <br />
          <span className="text-gradient">{t('hero.titleB', 'Feel safe again.')}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-fg-muted mx-auto mt-6 max-w-xl text-balance text-base sm:text-lg"
        >
          {t(
            'hero.subtitle',
            'An AI companion, breathing space, and calm rituals — designed to gently bring you back to yourself.',
          )}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button size="lg">
            {t('hero.ctaPrimary', 'Start your first breath')}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="glass" size="lg">
            {t('hero.ctaSecondary', 'Explore quietly')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Mood demonstration strip */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        className="mt-20 w-full max-w-3xl"
      >
        <Card>
          <div className="text-fg-muted flex items-center gap-2 text-sm font-medium">
            <Heart className="text-primary h-4 w-4" />
            <span>{t('moodDemo.label', 'How are you feeling right now?')}</span>
          </div>
          <p className="text-fg-subtle mt-2 text-sm">
            {t(
              'moodDemo.description',
              'Tap a feeling — the entire interface shifts to match. Your mood is private and stays on this device.',
            )}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium capitalize transition-all',
                  mood === m
                    ? 'bg-primary text-primary-fg border-transparent shadow-md'
                    : 'border-border bg-surface/60 text-fg-muted hover:border-primary/40 hover:text-fg',
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <p className="text-fg-subtle mt-5 text-xs">
            Active palette: <span className="text-fg-muted font-medium">{MOOD_TONE[mood]}</span>
          </p>
        </Card>
      </motion.div>

      {/* Foundation cards — Phase 0 deliverables visible */}
      <motion.div
        variants={stagger(0.2, 0.1)}
        initial="hidden"
        animate="visible"
        className="mt-16 grid w-full gap-4 sm:grid-cols-3"
      >
        {[
          {
            icon: <Sparkles className="h-5 w-5" />,
            title: t('foundation.tokens.title', 'Design tokens'),
            body: t(
              'foundation.tokens.body',
              'A single source of truth for colors, type, motion. Re-skins via CSS variables — no React re-render.',
            ),
          },
          {
            icon: <Waves className="h-5 w-5" />,
            title: t('foundation.moods.title', 'Five mood themes'),
            body: t(
              'foundation.moods.body',
              'Calm, anxious, sad, happy, overwhelmed — each shifts the ambient gradient without sacrificing legibility.',
            ),
          },
          {
            icon: <Heart className="h-5 w-5" />,
            title: t('foundation.motion.title', 'Calm motion'),
            body: t(
              'foundation.motion.body',
              'Framer Motion presets with spring physics, respecting prefers-reduced-motion at the source.',
            ),
          },
        ].map((item) => (
          <motion.div key={item.title} variants={fadeUp}>
            <Card className="h-full">
              <div className="bg-primary/10 text-primary mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-fg text-lg font-semibold">{item.title}</h3>
              <p className="text-fg-muted mt-2 text-sm leading-relaxed">{item.body}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <p className="text-fg-subtle mt-20 text-xs">Phase 0 · Foundation · Built with care.</p>
    </motion.section>
  );
}
