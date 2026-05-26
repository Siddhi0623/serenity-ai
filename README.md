# Serenity AI

A premium global mental wellness platform — AI companionship, breathing,
meditation, mood tracking, journaling, and a calming community space.

> ⚠️ Serenity AI is **not** a medical or therapeutic service. If you are in
> crisis, please contact a local emergency line or visit
> [findahelpline.com](https://findahelpline.com).

## Tech stack

- **Frontend** — React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- **State** — TanStack Query (server) + Zustand (UI) + Context (auth/theme)
- **Backend** _(Phase 2)_ — Node.js + Express + MongoDB Atlas + Firebase Admin
- **AI** — OpenAI (streaming) with crisis-detection guardrail
- **Hosting** — Vercel (web) + Railway (api) + MongoDB Atlas

## Repo layout

```
serenity-ai/
├── apps/
│   └── web/                 # React + Vite frontend
├── packages/
│   └── shared/              # Zod schemas + types shared across apps
├── .github/workflows/       # CI: typecheck + lint + build
└── ...                      # root tooling (Prettier, TS base, husky)
```

`apps/api/` is added in Phase 2 once the AI companion lands.

## Getting started

```bash
# Use Node 20 (see .nvmrc)
npm install
npm run hooks:install        # enable git pre-commit hooks (local only)
cp .env.example .env.local   # fill in values as you go
npm run dev                  # starts apps/web on http://localhost:5173
```

## Scripts (root)

| script              | what it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Start the web app in dev mode                   |
| `npm run build`     | Build every workspace that has a `build` script |
| `npm run typecheck` | TypeScript noEmit pass across workspaces        |
| `npm run lint`      | ESLint across workspaces                        |
| `npm run format`    | Prettier write across the repo                  |

## What's wired

**Phase 0 — Foundation**

- Monorepo (npm workspaces)
- Design token system → Tailwind + CSS variables
- Dark mode + 5 mood themes (`data-mood="calm|anxious|sad|happy|overwhelmed"`)
- Framer Motion preset library (respects `prefers-reduced-motion`)
- React Router skeleton + AppShell
- i18next bootstrap (en, scaffold for hi/es/ja)
- ESLint, Prettier, lint-staged + husky (local)
- GitHub Actions CI + Vercel deploy

**Phase 1 — The Hook**

- Premium landing (Hero · Pillars · Mood demo · How it works · Social proof · CTA)
- Firebase Authentication (email/password + Google) with graceful "not configured" fallback
- `<RequireAuth>` route guard with destination preservation
- 3-step onboarding (welcome → mood → intentions)
- Profile page stub (`/me`)
- Auth-aware header (avatar / sign-in)

See [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) for enabling sign-in.

## Roadmap

- **Phase 1** — Landing page + auth + profile
- **Phase 2** — Breathing + AI companion + mood tracker (backend boots)
- **Phase 3** — Journal (client-side encrypted) + meditation + ambient sounds + panic mode
- **Phase 4** — Challenges + streaks + dynamic mood themes
- **Phase 5** — Venting wall + sleep mode + games + PWA + full i18n
- **Phase 6** — Lighthouse 95+, Sentry, a11y audit, case study

## License

UNLICENSED — personal portfolio project.
