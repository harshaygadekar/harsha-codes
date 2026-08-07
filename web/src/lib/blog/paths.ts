/** Private writing console path — not linked publicly when logged out. */
export const BLOG_STUDIO_BASE = "/writing/hrsh";

export const blogStudio = {
  root: BLOG_STUDIO_BASE,
  new: `${BLOG_STUDIO_BASE}/new`,
  edit: (slug: string) => `${BLOG_STUDIO_BASE}/${slug}/edit`,
} as const;
