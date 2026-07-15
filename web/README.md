# Harsha.Codes — Portfolio

Premium single-page portfolio for **Harsha Y**.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui
- next-themes (dark primary / light polished)
- Framer Motion (restrained scroll reveals)
- Lucide icons + self-hosted tech SVGs

## Develop

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Keyboard:** `⌘K` / `Ctrl+K` opens the jump palette.

## Content updates

Edit **one file**:

```
src/content/portfolio.ts
```

Keep it aligned with the authoring document at `../portfolio-data.md`.

## Assets

| Path | Purpose |
|------|---------|
| `public/resume.pdf` | Resume download (replace the placeholder) |
| `public/og.png` | Optional Open Graph image |
| `public/icons/tech/*.svg` | Self-hosted tech stack icons |

Re-fetch icons (dev only):

```bash
npm run icons:fetch
```

## Environment

Copy `.env.example` → `.env.local` and fill as needed:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=
CONTACT_FROM=Portfolio <onboarding@resend.dev>
CONTACT_TO=harshaygadekar05@gmail.com
GITHUB_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

| Var | Effect if missing |
|-----|-------------------|
| `RESEND_API_KEY` | Form validates; logs message only |
| `GITHUB_TOKEN` | Public GitHub API (lower rate limit) |
| `UPSTASH_*` | Visitor count in-memory (resets on cold start) |

## Quality checks

```bash
npm test
npm run lint
npm run build
```

### Lighthouse (local)

With a production server already running (`npm run build && npm start`):

```bash
npm run lh
```

Or one-shot (requires `npx` / Chrome):

```bash
npm run lh:build
```

Target: Performance / Accessibility / SEO ≥ 90 (advisory, not a hard CI gate).

## Design

See `../DESIGN.md` for product spec, IA, tokens, and architecture.
