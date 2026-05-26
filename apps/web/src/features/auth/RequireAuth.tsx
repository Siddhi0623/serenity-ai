import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';

/**
 * Wrap protected routes. If the auth status is loading we show a calm
 * spinner; if anonymous we send the user to /login with the destination
 * preserved so they bounce back after signing in.
 */
export function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner className="text-primary h-6 w-6" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return <Outlet />;
  }

  // anonymous or unconfigured → send to login, preserve intent
  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
