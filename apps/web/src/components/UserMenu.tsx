import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/Avatar';
import { Spinner } from '@/components/ui/Spinner';

/**
 * Compact user state slot for the header.
 *  loading       → small spinner
 *  authenticated → avatar link to /me
 *  anonymous     → "Sign in" pill
 *  unconfigured  → "Sign in" pill (login page explains config state)
 */
export function UserMenu() {
  const { status, user } = useAuth();

  if (status === 'loading') {
    return (
      <span className="grid h-10 w-10 place-items-center" aria-label="Loading account">
        <Spinner className="text-fg-subtle h-4 w-4" />
      </span>
    );
  }

  if (status === 'authenticated' && user) {
    return (
      <Link
        to="/me"
        aria-label="Open profile"
        className="ring-border hover:ring-primary/40 rounded-full ring-1 transition-shadow"
      >
        <Avatar name={user.displayName} src={user.photoURL} size="md" />
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      className="border-border bg-surface/60 hover:bg-surface-2 backdrop-blur-glass text-fg inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors"
    >
      <LogIn className="h-3.5 w-3.5" />
      Sign in
    </Link>
  );
}
