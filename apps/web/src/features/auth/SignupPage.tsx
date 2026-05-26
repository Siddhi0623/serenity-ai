import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, PasswordInput } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { friendlyAuthError } from '@/lib/auth-errors';
import { AuthCard } from './AuthCard';
import { GoogleButton } from './GoogleButton';

const schema = z.object({
  name: z
    .string()
    .min(1, 'Please share what to call you.')
    .max(60, 'Let’s keep it short and sweet.'),
  email: z.email('That doesn’t look like a valid email.'),
  password: z
    .string()
    .min(8, 'A bit longer feels safer — at least 8 characters.')
    .max(72, 'That’s a long password. Try a shorter one.'),
});

type FormValues = z.infer<typeof schema>;

export function SignupPage() {
  const { signUpWithEmail, signInWithGoogle, status } = useAuth();
  const navigate = useNavigate();

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
      await signUpWithEmail(values.email, values.password, values.name);
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setTopError(friendlyAuthError(err));
    }
  });

  const onGoogle = async () => {
    setTopError(null);
    try {
      await signInWithGoogle();
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setTopError(friendlyAuthError(err));
    }
  };

  return (
    <AuthCard
      title="A softer place to land."
      subtitle="Create a space that's yours, free of judgment."
      footer={
        <>
          Already with us?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {unconfigured && (
        <div className="border-border bg-surface-2 text-fg-muted mb-5 rounded-2xl border p-4 text-sm">
          <p className="text-fg font-medium">Auth isn’t configured yet.</p>
          <p className="mt-1">
            Add your Firebase keys to <code className="font-mono text-xs">.env.local</code> to
            enable sign-up.
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
          label="What should we call you?"
          autoComplete="name"
          leftIcon={<UserIcon className="h-4 w-4" />}
          placeholder="Your first name is enough"
          error={errors.name?.message}
          disabled={unconfigured}
          {...register('name')}
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          hint="A short phrase you'll remember is better than a complicated one."
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
          {isSubmitting ? 'Creating your space…' : 'Begin gently'}
        </Button>

        <p className="text-fg-subtle pt-1 text-center text-xs">
          By continuing, you agree to be kind to yourself today.
        </p>
      </form>
    </AuthCard>
  );
}
