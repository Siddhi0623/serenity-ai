import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ThemeMoodSwitcher } from '@/components/ThemeMoodSwitcher';
import { UserMenu } from '@/components/UserMenu';
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
        className="container-calm z-sticky sticky top-0 flex items-center justify-between py-5"
      >
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="from-lavender-400 grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br to-sky-400 text-white shadow-md transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-fg text-lg font-semibold tracking-tight">
            Serenity<span className="text-primary">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeMoodSwitcher />
          <UserMenu />
        </div>
      </motion.header>

      <main className="container-calm pb-section relative z-10 flex-1 pt-8">
        <Outlet />
      </main>

      <footer className="container-calm text-fg-subtle relative z-10 py-10 text-center text-sm">
        <p>Serenity AI · A calmer corner of the internet.</p>
        <p className="text-fg-subtle/80 mt-1 text-xs">
          Not a replacement for professional care. In a crisis, contact your local helpline.
        </p>
      </footer>
    </div>
  );
}
