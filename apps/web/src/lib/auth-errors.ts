import { FirebaseError } from 'firebase/app';

/**
 * Translate Firebase Auth error codes into calm, human messages.
 * Wellness app rule: never use scary or accusatory language for auth failures.
 */
const FRIENDLY_ERRORS: Record<string, string> = {
  'auth/invalid-email': 'That email address doesn’t look right. Mind checking it?',
  'auth/invalid-credential': 'Those credentials don’t match. Try again, gently.',
  'auth/user-not-found': 'We couldn’t find an account with that email. Want to sign up instead?',
  'auth/wrong-password': 'That password doesn’t look right. Try again — no rush.',
  'auth/email-already-in-use':
    'There’s already an account with this email. Try signing in instead.',
  'auth/weak-password': 'A slightly longer password would feel safer (at least 8 characters).',
  'auth/popup-closed-by-user': 'The sign-in window closed. Try once more when you’re ready.',
  'auth/popup-blocked':
    'Your browser blocked the sign-in popup. Allow popups for this site and try again.',
  'auth/network-request-failed':
    'Looks like we lost the connection. Take a breath and try again in a moment.',
  'auth/too-many-requests': 'We’re pausing briefly for safety. Try again in a minute or so.',
};

export function friendlyAuthError(err: unknown): string {
  if (err instanceof FirebaseError) {
    return FRIENDLY_ERRORS[err.code] ?? 'Something didn’t go through. Take a breath and try again.';
  }
  if (err instanceof Error) return err.message;
  return 'Something didn’t go through. Take a breath and try again.';
}
