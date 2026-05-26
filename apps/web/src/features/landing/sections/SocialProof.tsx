import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { fadeUp, stagger } from '@/lib/motion-presets';

type Testimonial = { name: string; role: string; body: string };

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Aria, 28',
    role: 'designer, london',
    body: 'I opened it on a hard day and the colors just… softened. The smallest thing made me cry, in a good way.',
  },
  {
    name: 'Kenji, 34',
    role: 'engineer, tokyo',
    body: 'Three minutes of guided breathing before standup. I forgot how much my body had been bracing.',
  },
  {
    name: 'Priya, 22',
    role: 'student, mumbai',
    body: 'The journal stays mine. No “growth metrics,” no streaks. I write when I want and that’s it.',
  },
];

export function SocialProof() {
  return (
    <section className="mt-28 sm:mt-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-wider">
          From people like you
        </p>
        <h2 className="font-display text-fg mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Small moments, quietly mattering.
        </h2>
      </motion.div>

      <motion.div
        variants={stagger(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid gap-4 sm:grid-cols-3"
      >
        {TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.name}
            variants={fadeUp}
            className="glass flex h-full flex-col justify-between rounded-3xl p-6"
          >
            <Quote className="text-primary/60 h-5 w-5" aria-hidden />
            <blockquote className="text-fg mt-4 text-sm leading-relaxed">“{t.body}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Avatar name={t.name} size="sm" />
              <div className="text-xs leading-tight">
                <p className="text-fg font-medium">{t.name}</p>
                <p className="text-fg-subtle">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      <p className="text-fg-subtle mt-6 text-center text-xs">
        Composite voices reflecting early user research — real names protected by design.
      </p>
    </section>
  );
}
