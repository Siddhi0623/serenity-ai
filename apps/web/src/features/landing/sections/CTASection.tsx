import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { fadeUp } from '@/lib/motion-presets';

export function CTASection() {
  return (
    <section className="mt-28 sm:mt-36">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem]"
      >
        <div className="bg-aurora absolute inset-0 opacity-90" aria-hidden />
        <div className="glass relative rounded-[2rem] p-10 sm:p-14">
          <p className="text-primary text-xs font-semibold uppercase tracking-wider">
            When you’re ready
          </p>
          <h2 className="font-display text-fg mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Take one calm breath with us.
          </h2>
          <p className="text-fg-muted mt-3 max-w-xl text-base">
            A minute is enough. Serenity will be here, gentle as ever, whenever you come back.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup">
              <Button size="lg">
                Begin gently
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="lg">
                I already have an account
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
