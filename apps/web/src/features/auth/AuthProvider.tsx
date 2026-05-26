import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import { AuthContext, type AuthContextValue, type AuthStatus } from './auth-context';

/**
 * AuthProvider — single source of truth for the current Firebase user.
 *
 * Status flow:
 *   unconfigured ← env vars missing; auth pages explain gracefully
 *   loading      ← Firebase is still resolving the initial session
 *   anonymous    ← Firebase resolved, no signed-in user
 *   authenticated ← Firebase resolved, user is signed in
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = getFirebaseAuth();
  const configured = isFirebaseConfigured();

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(configured ? 'loading' : 'unconfigured');

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setStatus(u ? 'authenticated' : 'anonymous');
    });
    return unsub;
  }, [auth]);

  const ensureAuth = useCallback(() => {
    const a = getFirebaseAuth();
    if (!a) throw new Error('Auth isn’t configured yet — add your Firebase keys to .env.local.');
    return a;
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(ensureAuth(), email, password);
    },
    [ensureAuth],
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const cred = await createUserWithEmailAndPassword(ensureAuth(), email, password);
      if (displayName && cred.user) {
        await updateProfile(cred.user, { displayName });
      }
    },
    [ensureAuth],
  );

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(ensureAuth(), googleProvider);
  }, [ensureAuth]);

  const signOut = useCallback(async () => {
    await firebaseSignOut(ensureAuth());
  }, [ensureAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut }),
    [status, user, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
