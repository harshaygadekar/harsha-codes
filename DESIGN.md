# Harsha.Codes — Portfolio Design Spec (v1)

Phases 1–3. Implementation follows this document.

---

## Phase 1 — Product understanding & decisions

### Audience
Recruiters and hiring managers for Backend / SDE / AI Engineer roles (Bengaluru / remote India). Primary job of the page: prove production craft in under 30 seconds.

### Content inventory (from `portfolio-data.md`)
| Block | Source | On page? |
|-------|--------|----------|
| Identity, summary, location | Contact + Professional Summary | Hero |
| Nokia SDE Intern | Work Experience | Experience |
| Education (MCA, BCA) | Education | Experience (compact trail) |
| 6 high-priority projects | Featured Projects | Projects |
| 2 publications | Research Publications | Research (inside Projects area) |
| Skills | Technical Skills | Tech stack chips |
| Social | GitHub, LinkedIn, Email only | Social bento |
| Job search / story bank / drainers | — | **Omit** (internal, not portfolio) |

### Ambiguities resolved (no blockers)
| Ambiguity | Decision |
|-----------|----------|
| X / Threads / Instagram unset | Content model supports them; `enabled: false` until URLs exist. Do not show empty cards. |
| Age “22” in sketch | **Omit** — not in source data. |
| Banner / profile assets | CSS matte abstract banner + initials avatar with pixel-grid treatment. Swap via `public/` later. |
| Resume file missing | CTA points to `/resume.pdf`. User drops file into `public/`. |
| Follower counts | Editable in content; GitHub metrics hydrated from public API at build when available. |
| Visitor counter | Lightweight API + cookie dedupe; seed in content. |
| Contact spam resistance | Honeypot field + rate-limit headers; `mailto:` fallback if no email API key. |
| Brand name | **Harsha.Codes** (from sketch). |
| Role line | “Software Engineer · AI & Backend” (signature framing). |
| Company name | “Nokia” (data); not “Nokia Network and Solutions LTD”. |
| External link affordance | Subtle ↗ on all external links (sketch note). |
| V2 More / Links pages | Nav stub only; no restructuring required later. |

### Site map (v1 single page)
```
/  →  Hero → Social → Experience → Projects (+ Research) → Tech → GitHub → Contact → Footer
/more → stub “Coming soon” (v2)
```

---

## Phase 2 — Product & technical architecture

### Product specification
- **Type:** Static-first single-page portfolio (SSG), progressive enhancement for theme, contact, visitors, GitHub.
- **Feel:** Linear / Vercel / Raycast-adjacent — deep matte dark, calm spacing, restrained motion.
- **Primary CTA:** Contact (email / form). Secondary: Resume, GitHub.
- **Success metric (qualitative):** Recruiter can state company, impact numbers, and how to contact within one scroll on mobile.

### Information architecture
1. **Nav** — brand, section anchors, theme toggle, More (stub)
2. **Hero** — banner, avatar, name, role, location, summary, CTAs, visitor chip
3. **Social** — bento of enabled platforms + metrics
4. **Experience** — vertical timeline (Nokia) + education footnotes
5. **Projects** — card grid (high priority only) + research cards
6. **Tech** — categorized interactive chips
7. **GitHub** — contribution graph image + pinned/recent repos
8. **Contact** — minimal form
9. **Footer** — copyright, links, theme echo

### Component hierarchy
```
RootLayout
  ThemeProvider
  SiteHeader
  main
    HeroSection
    SocialSection
    ExperienceSection
    ProjectsSection
    TechSection
    GitHubSection
    ContactSection
  SiteFooter
```

Leaf components (only when reused): `Section`, `ExternalLink`, `TechChip`, `ProjectCard`, `TimelineItem`, `SocialCard`, `ThemeToggle`, `VisitorCount`.

### Design system

#### Color (CSS variables, dark primary)
| Token | Dark | Light | Role |
|-------|------|-------|------|
| `--background` | `#080616` | `#F7F7FB` | Page |
| `--foreground` | `#E8E8F0` | `#0C0B1A` | Body text |
| `--muted` | `#9B9BB0` | `#5C5C72` | Secondary text |
| `--border` | `#1E1C35` | `#E2E0EE` | Hairlines |
| `--card` | `#0E0C1C` | `#FFFFFF` | Surfaces |
| `--primary` | `#111844` | `#111844` | Actions / focus |
| `--secondary` | `#162E93` | `#162E93` | Depth accents |
| `--accent` | `#1A1953` | `#E8E7F5` | Soft fills |
| `--ring` | `#111844` | `#111844` | Focus |

Matte surfaces: solid fills + 1px border + soft shadow (`0 1px 0 rgba(255,255,255,0.04) inset`, `0 8px 24px rgba(0,0,0,0.35)`). No glass blur.

#### Typography
- **Sans:** `Geist` (or Inter fallback) — UI, body
- **Mono:** `Geist Mono` / `ui-monospace` — metrics, tech labels
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 40 (rem-based)
- Weights: 400 body, 500 labels, 600 headings
- Line-height: 1.5 body, 1.2 display

#### Spacing
4px base: 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24  
Section vertical: `py-16 md:py-24`  
Content max: `max-w-5xl` centered; hero may use `max-w-6xl`

#### Radius
`sm: 6px`, `md: 10px`, `lg: 14px` — restrained, not pill-heavy.

#### Animation
- Duration: 150–250ms UI, 400ms section enter
- Easing: `ease-out`
- Respect `prefers-reduced-motion: reduce` → no enter animations
- Allowed: fade/slide-in once on view; chip hover lift 1px; focus ring
- Forbidden: continuous parallax, scroll-jacking, bounce loops

#### Responsive
| Breakpoint | Behavior |
|------------|----------|
| <640 | Single column; sticky compact nav; social stack; project 1-col |
| 640–1024 | 2-col projects; social 2×N bento |
| ≥1024 | Full timeline, 2–3 col projects, rich bento |

Mobile is designed first for hero (stack banner → avatar row → text → CTAs).

### Folder structure
```
/
  portfolio-data.md          # human source of truth (authoring)
  DESIGN.md
  public/
    resume.pdf               # user-supplied
    og.png                   # generated later if missing
  src/
    app/
      layout.tsx
      page.tsx
      more/page.tsx
      globals.css
      robots.ts
      sitemap.ts
      api/visitors/route.ts
      api/contact/route.ts
    components/
      ui/                    # shadcn primitives only
      layout/                # header, footer, section shell
      sections/              # one file per section
    content/
      portfolio.ts           # typed SSOT for the app
    lib/
      utils.ts
      github.ts
      motion.ts
    types/
      portfolio.ts
```

### Technical architecture
| Concern | Approach | Why |
|---------|----------|-----|
| Framework | Next.js App Router, TS, Tailwind | PRD + official defaults |
| UI kit | shadcn/ui (Button, Input, Textarea, Badge, Card) | Accessible primitives, copy-owned |
| Motion | framer-motion, reduced-motion aware | PRD; used sparingly |
| Icons | lucide-react | PRD |
| Theme | `next-themes` class strategy | Dark primary, light polished |
| Content | `content/portfolio.ts` | One edit path for site data |
| GitHub | Build-time `fetch` public API + ghchart image | Efficient, no client secret |
| Contact | Route handler + honeypot | Simple spam resistance |
| Visitors | Route + httpOnly-ish cookie flag | Lightweight |
| SEO | metadata API, JSON-LD Person, sitemap, robots | PRD |
| Images | `next/image` when assets exist; CSS for placeholders | Perf |

**Deps we will not add:** CMS, state libs, animation kits beyond FM, chart libs, full GitHub calendar packages.

### V2 extension points (no build now)
- `app/more/page.tsx` already exists as stub → fill with feeds
- `content/` can grow `links.ts` for subdomain Linktree later
- Social bento already keyed by platform id

---

## Phase 3 — Critical review (pre-implementation)

| Risk | Mitigation |
|------|------------|
| Empty social platforms look unfinished | Only render `enabled` entries |
| Missing resume 404s | Button still present; optional hide if file check fails at build (skip check — user adds PDF) |
| GitHub API rate limits | Build-time fetch with `revalidate`; graceful empty state |
| Visitor counter not durable on serverless | Document as best-effort; seed + cookie dedupe; upgrade path Upstash |
| Light mode afterthought | Define both palettes in tokens before any section CSS |
| Over-animation | Cap motion to section fade + hover; reduced-motion hard stop |
| Giant section files | Cap ~150 lines; extract cards |
| Content drift from md | Comment at top of `portfolio.ts`: keep in sync with `portfolio-data.md` |
| a11y: contrast on `#111844` | Primary buttons use white text; never primary-on-dark body text for long copy |
| Mobile nav overflow | Hamburger only if needed; prefer horizontal scroll-free anchor list |

**Visual consistency checklist:** one card radius, one border color, one primary button style, mono for metrics only.

**Perf budget:** no client JS on static sections except theme, motion (lazy), form, visitor chip.

---

## Implementation order (Phase 4)
1. Scaffold Next.js + Tailwind + shadcn + theme tokens  
2. Content module + types  
3. Layout shell (header/footer)  
4. Hero → Social → Experience → Projects → Tech → GitHub → Contact  
5. SEO + sitemap + robots  
6. Phase 5 polish pass  

---

*Sources for stack setup: [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation), [shadcn/ui Next.js](https://ui.shadcn.com/docs/installation/next).*
