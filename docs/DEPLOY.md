# Deploying Serenity AI

## Frontend (Vercel)

1. Push the repo to GitHub (see `docs/GIT.md`).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** your GitHub repo.
3. Vercel auto-detects the config from `vercel.json` (Vite, monorepo-aware).
   Leave the defaults; the build command and output directory are already set.
4. Add the env vars from `.env.example` (only the `VITE_*` ones — the backend
   ones come later in Phase 2):
   - `VITE_API_URL` — placeholder for now, point at `https://api.example.com/api/v1`
   - others can be left blank until Phase 1 wires Firebase.
5. Deploy. Every push to `main` → production. Every PR → preview URL.

## Backend (Railway — added in Phase 2)

When `apps/api/` lands:

1. Create a Railway project → New Service → Deploy from GitHub.
2. Root directory: `apps/api`.
3. Build command: `npm ci && npm run build --workspace=@serenity/api`.
4. Start command: `npm run start --workspace=@serenity/api`.
5. Env vars: `MONGODB_URI`, `FIREBASE_SERVICE_ACCOUNT_BASE64`, `OPENAI_API_KEY`,
   `CORS_ORIGIN=https://your-vercel-url.vercel.app`.

## Database (MongoDB Atlas)

1. Create a free M0 cluster on [Atlas](https://cloud.mongodb.com).
2. Network access → allow Railway's egress IPs (or 0.0.0.0/0 for development).
3. Create a DB user → copy the connection string into Railway's `MONGODB_URI`.

## Domain (later)

- Buy a domain on Namecheap or similar.
- Add a CNAME pointing to `cname.vercel-dns.com`.
- Vercel handles HTTPS automatically.
