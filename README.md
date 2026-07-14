# harsha-codes

Personal portfolio for **Harsha Y** — [Harsha.Codes](https://harsha.codes).

## Project layout

| Path | Purpose |
|------|---------|
| `web/` | Next.js portfolio app |
| `portfolio-data.md` | Authoring content source |
| `DESIGN.md` | Design & architecture spec |
| `sketch/` | Layout wireframes |

## Develop

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Content for the site lives in `web/src/content/portfolio.ts` (keep in sync with `portfolio-data.md`).

## Deploy

Deploy the `web/` directory to Vercel (or any Next.js host). Set optional env:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=
CONTACT_TO=
```
