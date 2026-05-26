import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { fadeUp } from '@/lib/motion-presets';

type AuthCardProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto mt-8 w-full max-w-md"
    >
      <div className="mb-6 flex items-center justify-center gap-2.5">
        <span className="from-lavender-400 grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br to-sky-400 text-white shadow-md">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="font-display text-fg text-lg font-semibold tracking-tight">
          Serenity<span className="text-primary">.</span>
        </span>
      </div>
      <div className="glass rounded-3xl p-7 sm:p-8">
        <h1 className="font-display text-fg text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-fg-muted mt-2 text-sm leading-relaxed">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
      {footer && <p className="text-fg-muted mt-6 text-center text-sm">{footer}</p>}
    </motion.div>
  );
}
