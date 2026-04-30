# CRA frontend

Next.js App Router frontend for the CRA micro project: React 19, TypeScript, Tailwind CSS, and `react-intl` for localization.

## Prerequisites

- **Node.js** — use an LTS release compatible with Next.js 16 (for example Node 20 or 22).

## Environment

Create a `.env` file in the project root (same folder as `package.json`). The contact form API needs:

| Variable | Required | Description |
|----------|----------|-------------|
| `BREVO_API_KEY` | Yes | Brevo API key for transactional email |
| `ADMIN_EMAIL` | Yes | Address that receives contact submissions |
| `BACKEND_URL` | Yes | Backend API URL for fetching terms and translations |
| `BREVO_SENDER_EMAIL` | No | Verified sender in Brevo; defaults to `ADMIN_EMAIL` if omitted |

Without these, the site may load, but submitting the contact form returns a server error.

## Install dependencies

From this directory:

```bash
npm install
```

You can use `pnpm install` or `yarn` instead if you prefer; keep your lockfile strategy consistent for the team.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server at [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run the production server (after `build`) |
| `npm run lint` | ESLint |

## Deploy on Vercel

This app is a standard Next.js project and deploys cleanly on [Vercel](https://vercel.com).

1. **Push the repo** to GitHub, GitLab, or Bitbucket (or import an existing repository).

2. **Create a project** in the [Vercel dashboard](https://vercel.com/new): import the repository that contains this frontend.

3. **Configure the project**
   - **Framework preset:** Next.js (usually detected automatically).
   - **Root directory:** If this repo is only the frontend, leave the default (`.`). If the frontend lives in a subfolder of a monorepo, set **Root Directory** to that folder (for example `frontend`).
   - **Build & Output:** Defaults are fine — **Build Command** `next build`, **Install Command** `npm install` (or match your lockfile).

4. **Environment variables** — In the project **Settings → Environment**, add the same variables as in [Environment](#environment) for **Production** (and **Preview** if you want previews to work end-to-end):

   | Name | Notes |
   |------|--------|
   | `BREVO_API_KEY` | Required for contact email |
   | `ADMIN_EMAIL` | Required |
   | `BACKEND_URL` | Required; use your deployed backend URL |
   | `BREVO_SENDER_EMAIL` | Optional |

   Mark secrets as **Sensitive** in Vercel so they are not exposed to the client.

5. **Deploy** — Trigger the first deployment. After it succeeds, Vercel assigns a production URL; custom domains can be added under **Settings → Domains**.

`BACKEND_URL` must be reachable from Vercel’s servers (public HTTPS). If the backend blocks unknown origins, configure CORS for your Vercel domain.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
