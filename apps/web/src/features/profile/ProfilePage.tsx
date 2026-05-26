import { motion } from 'framer-motion';
import { Globe, LogOut, Mail, Pencil, Sparkles } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { fadeUp, stagger } from '@/lib/motion-presets';

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const { mood } = useTheme();

  if (!user) return null;

  return (
    <motion.section
      variants={stagger(0.05, 0.08)}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl"
    >
      <motion.div variants={fadeUp} className="glass mt-6 rounded-3xl p-7 sm:p-9">
        <div className="flex items-center gap-5">
          <Avatar name={user.displayName} src={user.photoURL} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-fg truncate text-2xl font-semibold tracking-tight">
              {user.displayName || 'Welcome back'}
            </h1>
            <p className="text-fg-muted mt-0.5 truncate text-sm">
              <Mail className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
              {user.email}
            </p>
          </div>
          <Button variant="secondary" size="sm" disabled title="Editing arrives in Phase 2">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <div className="bg-primary/10 text-primary mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl">
            <Sparkles className="h-4 w-4" />
          </div>
          <p className="text-fg-muted text-xs font-medium uppercase tracking-wider">
            Current feeling
          </p>
          <p className="text-fg mt-1 text-lg font-semibold capitalize">{mood}</p>
          <p className="text-fg-subtle mt-1 text-xs">
            Tap the mood chips in the header to shift the space.
          </p>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="bg-primary/10 text-primary mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl">
            <Globe className="h-4 w-4" />
          </div>
          <p className="text-fg-muted text-xs font-medium uppercase tracking-wider">Language</p>
          <p className="text-fg mt-1 text-lg font-semibold">English</p>
          <p className="text-fg-subtle mt-1 text-xs">
            Hindi, Spanish and Japanese arrive in Phase 5.
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-4 flex justify-end">
        <Button variant="ghost" onClick={() => void signOut()}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </motion.div>

      <p className="text-fg-subtle mt-10 text-center text-xs">
        More personal settings appear here as features arrive — companion preferences, journal
        recovery keys, sleep schedule, language.
      </p>
    </motion.section>
  );
}
