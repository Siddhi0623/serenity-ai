# Firebase Setup — 5 minutes

Serenity uses Firebase Authentication for sign-in (email/password + Google).
The app boots gracefully without it — auth pages will show a calm "not
configured" message — so you can do this whenever.

## 1. Create the project

1. Open [console.firebase.google.com](https://console.firebase.google.com) and
   click **Add project**.
2. Name it (e.g. `serenity-ai`), accept defaults. Skip Google Analytics
   for now if you want — you can enable it later.

## 2. Enable Authentication providers

1. In the left sidebar → **Build → Authentication → Get started**.
2. **Sign-in method** tab:
   - Enable **Email/Password**.
   - Enable **Google** — set the project support email when prompted.

## 3. Register the web app

1. Project Overview → click the **`</>`** (web) icon.
2. Nickname it `serenity-web`. Skip Firebase Hosting (we use Vercel).
3. Copy the config object. You only need these four fields:

```js
apiKey: "...",
authDomain: "...",
projectId: "...",
appId: "...",
```

## 4. Local dev — add to `.env.local`

Create `.env.local` in the repo root (or copy from `.env.example`) and fill
in the values:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

Restart `npm run dev` so Vite picks up the new env vars.

## 5. Production — add to Vercel

1. Vercel project → **Settings → Environment Variables**.
2. Add the same four `VITE_FIREBASE_*` variables (apply to Production,
   Preview, and Development).
3. Trigger a redeploy.

## 6. Allow your domains

Firebase blocks auth from unknown origins by default. Add your hosts to:

**Firebase Console → Authentication → Settings → Authorized domains**

- `localhost` (added by default)
- `your-project.vercel.app`
- `serenity-ai-web-*.vercel.app` (Vercel preview URLs — add the pattern or
  individual preview domains as you create PRs)
- Your custom domain if you have one

## Troubleshooting

- **`auth/unauthorized-domain`** → you missed step 6.
- **Popup blocked** → browser setting. Try once with popups allowed; or
  switch to redirect-based sign-in (see `signInWithRedirect` in Firebase
  docs).
- **Email link is rejected** → check that **Email/Password** is enabled and
  your email isn’t already used by a Google sign-in (Firebase silently
  treats them as separate accounts).
