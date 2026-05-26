import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion-presets';

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Arrive as you are',
    body: 'Tell us how you’re feeling. The interface softens to meet you there — no scoring, no judgment.',
  },
  {
    n: '02',
    title: 'Choose a small ritual',
    body: 'Two minutes of breath, a written reflection, an ambient soundscape — pick what fits the moment.',
  },
  {
    n: '03',
    title: 'Come back when you need',
    body: 'No streaks to break. No notifications to chase. Serenity is here whenever you reach for it.',
  },
];

export function HowItWorks() {
  return (
    <section className="mt-28 sm:mt-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-wider">How it works</p>
        <h2 className="font-display text-fg mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Gentle, every time.
        </h2>
      </motion.div>

      <motion.ol
        variants={stagger(0.12, 0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 sm:grid-cols-3"
      >
        {STEPS.map(({ n, title, body }) => (
          <motion.li key={n} variants={fadeUp} className="relative">
            <span className="text-gradient font-display block text-5xl font-semibold leading-none">
              {n}
            </span>
            <h3 className="text-fg mt-4 text-lg font-semibold">{title}</h3>
            <p className="text-fg-muted mt-2 text-sm leading-relaxed">{body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
