import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { fadeUp, stagger } from '@/lib/motion-presets';

export function Hero() {
  const { t } = useTranslation();
  return (
    <motion.div
      variants={stagger(0.12, 0.1)}
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
        <Link to="/signup">
          <Button size="lg">
            {t('hero.ctaPrimary', 'Start your first breath')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="glass" size="lg">
            {t('hero.ctaSecondary', 'I have an account')}
          </Button>
        </Link>
      </motion.div>

      <motion.p variants={fadeUp} className="text-fg-subtle mt-6 text-xs">
        Free forever for the basics · No ads · Your data stays yours
      </motion.p>
    </motion.div>
  );
}
