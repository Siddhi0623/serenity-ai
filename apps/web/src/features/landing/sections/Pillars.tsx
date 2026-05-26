import { motion } from 'framer-motion';
import { Brain, MessageCircle, Moon, Wind } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { fadeUp, stagger } from '@/lib/motion-presets';

type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Wind,
    title: 'Breathe',
    body: 'Guided breathing in three rhythms — box, 4-7-8, anxiety-relief — with on-screen pacing.',
  },
  {
    icon: MessageCircle,
    title: 'Reflect',
    body: 'An AI companion that listens without judging, and an encrypted journal that only you can read.',
  },
  {
    icon: Moon,
    title: 'Rest',
    body: 'Sleep stories, ambient mixes, and a wind-down mode that hushes when it’s time.',
  },
  {
    icon: Brain,
    title: 'Focus',
    body: 'Calm meditation timers and gentle rituals to return to centered, present work.',
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="mt-28 sm:mt-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-wider">
          Four quiet pillars
        </p>
        <h2 className="font-display text-fg mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A small set of tools, made with care.
        </h2>
        <p className="text-fg-muted mt-3 text-base">
          Not a feed. Not a streak machine. Just the few things you actually reach for when life
          gets loud.
        </p>
      </motion.div>

      <motion.div
        variants={stagger(0.1, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PILLARS.map(({ icon: Icon, title, body }) => (
          <motion.div key={title} variants={fadeUp}>
            <Card className="h-full">
              <div className="bg-primary/10 text-primary mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-fg text-lg font-semibold">{title}</h3>
              <p className="text-fg-muted mt-2 text-sm leading-relaxed">{body}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
