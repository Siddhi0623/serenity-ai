import { createContext } from 'react';
import type { User } from 'firebase/auth';

export type AuthStatus = 'loading' | 'authenticated' | 'anonymous' | 'unconfigured';

export type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
