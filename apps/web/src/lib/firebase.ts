import { initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { GoogleAuthProvider, getAuth, type Auth } from 'firebase/auth';

/**
 * Firebase client — lazily initialized.
 *
 * If env vars are missing we return `null` instead of crashing. Auth screens
 * surface a calm "auth isn't configured" message so the rest of the app still
 * renders. This keeps the experience graceful while you're wiring secrets.
 */

const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function isFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) return null;
  if (!app) app = initializeApp(config);
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured()) return null;
  if (!auth) {
    const fbApp = getFirebaseApp();
    if (!fbApp) return null;
    auth = getAuth(fbApp);
    auth.useDeviceLanguage();
  }
  return auth;
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
