import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ThemeMoodSwitcher } from '@/components/ThemeMoodSwitcher';
import { AuroraBackground } from '@/components/visual/AuroraBackground';
import { fadeDown } from '@/lib/motion-presets';

export function AppShell() {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden">
      <AuroraBackground />

      <motion.header
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        className="container-calm sticky top-0 z-sticky flex items-center justify-between py-5"
      >
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-lavender-400 to-sky-400 text-white shadow-md transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-fg">
            Serenity<span className="text-primary">.</span>
          </span>
        </Link>
        <ThemeMoodSwitcher />
      </motion.header>

      <main className="container-calm relative z-10 flex-1 pb-section pt-8">
        <Outlet />
      </main>

      <footer className="container-calm relative z-10 py-10 text-center text-sm text-fg-subtle">
        <p>Serenity AI · A calmer corner of the internet.</p>
        <p className="mt-1 text-xs text-fg-subtle/80">
          Not a replacement for professional care. In a crisis, contact your local helpline.
        </p>
      </footer>
    </div>
  );
}
