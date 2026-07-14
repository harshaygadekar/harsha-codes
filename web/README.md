# Harsha.Codes — Portfolio

Premium single-page portfolio for **Harsha Y**.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui
- next-themes (dark primary / light polished)
- Framer Motion available (used sparingly)
- Lucide icons

## Develop

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

## Environment (optional)

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_xxx
CONTACT_FROM=Portfolio <onboarding@resend.dev>
CONTACT_TO=harshaygadekar05@gmail.com
```

Without `RESEND_API_KEY`, the contact form validates + honeypots + rate-limits, then logs the message (mailto fallback in UI still works).

## Design

See `../DESIGN.md` for product spec, IA, tokens, and architecture.
