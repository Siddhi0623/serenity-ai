import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { MOODS, type Mood } from '@/design/tokens';
import { Card } from '@/components/ui/Card';
import { fadeUp } from '@/lib/motion-presets';
import { cn } from '@/lib/cn';

const MOOD_TONE: Record<Mood, string> = {
  calm: 'soft lavender + sky',
  anxious: 'low-saturation mint',
  sad: 'warm peach + amber',
  happy: 'bright peach + sun',
  overwhelmed: 'ultra-muted neutral',
};

export function MoodDemo() {
  const { mood, setMood } = useTheme();
  return (
    <section className="mt-28 sm:mt-36">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-3xl"
      >
        <Card>
          <div className="text-fg-muted flex items-center gap-2 text-sm font-medium">
            <Heart className="text-primary h-4 w-4" />
            <span>How are you feeling right now?</span>
          </div>
          <p className="text-fg-subtle mt-2 text-sm">
            Tap a feeling — the entire interface shifts to match. Your mood is private and stays on
            this device.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                aria-pressed={mood === m}
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
    </section>
  );
}
