# Pushing Serenity AI to GitHub

The local repo is already initialized. Two paths to GitHub:

## Option A — using `gh` CLI (recommended)

```powershell
winget install GitHub.cli
gh auth login                       # follow the browser prompt
gh repo create serenity-ai --public --source=. --remote=origin --push
```

## Option B — without `gh`

1. Go to [github.com/new](https://github.com/new) → name it `serenity-ai`,
   set visibility, **do not** initialize with README/license (we already have them).
2. From the repo root in PowerShell:

```powershell
git remote add origin https://github.com/<your-username>/serenity-ai.git
git branch -M main
git push -u origin main
```

After that, any push to `main` triggers the GitHub Actions CI workflow at
`.github/workflows/ci.yml`.
