import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { fadeUp } from '@/lib/motion-presets';

export function NotFoundPage() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-md py-20 text-center"
    >
      <p className="font-display text-6xl font-semibold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-fg">
        This page drifted away.
      </h1>
      <p className="mt-2 text-sm text-fg-muted">
        Let's get you back to somewhere calm.
      </p>
      <Link to="/" className="mt-8 inline-block">
        <Button>Return home</Button>
      </Link>
    </motion.div>
  );
}
