import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, PasswordInput } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { friendlyAuthError } from '@/lib/auth-errors';
import { AuthCard } from './AuthCard';
import { GoogleButton } from './GoogleButton';

const schema = z.object({
  email: z.email('That doesn’t look like a valid email.'),
  password: z.string().min(1, 'Please enter your password.'),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { signInWithEmail, signInWithGoogle, status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/me';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [topError, setTopError] = useState<string | null>(null);
  const unconfigured = status === 'unconfigured';

  const onSubmit = handleSubmit(async (values) => {
    setTopError(null);
    try {
      await signInWithEmail(values.email, values.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setTopError(friendlyAuthError(err));
    }
  });

  const onGoogle = async () => {
    setTopError(null);
    try {
      await signInWithGoogle();
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setTopError(friendlyAuthError(err));
    }
  };

  return (
    <AuthCard
      title="Welcome back."
      subtitle="A calm space, just where you left it."
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {unconfigured && (
        <div className="border-border bg-surface-2 text-fg-muted mb-5 rounded-2xl border p-4 text-sm">
          <p className="text-fg font-medium">Auth isn’t configured yet.</p>
          <p className="mt-1">
            Add your Firebase keys to <code className="font-mono text-xs">.env.local</code> (see{' '}
            <a className="text-primary hover:underline" href="/">
              docs/FIREBASE_SETUP.md
            </a>
            ) to enable sign-in.
          </p>
        </div>
      )}
      <GoogleButton onClick={onGoogle} disabled={isSubmitting || unconfigured} />

      <div className="my-5 flex items-center gap-3">
        <span className="bg-border h-px flex-1" />
        <span className="text-fg-subtle text-xs uppercase tracking-wider">or</span>
        <span className="bg-border h-px flex-1" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          placeholder="you@calm.app"
          error={errors.email?.message}
          disabled={unconfigured}
          {...register('email')}
        />
        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          disabled={unconfigured}
          {...register('password')}
        />

        {topError && (
          <p role="alert" className="text-sm text-red-400">
            {topError}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting || unconfigured}>
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthCard>
  );
}
