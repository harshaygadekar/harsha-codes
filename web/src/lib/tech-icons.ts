/**
 * Local monochrome tech icon path for CSS masking.
 * SVGs live in public/icons/tech/{slug}.svg (self-hosted, no runtime CDN).
 */
export function techIconUrl(slug: string): string {
  return `/icons/tech/${encodeURIComponent(slug)}.svg`;
}
