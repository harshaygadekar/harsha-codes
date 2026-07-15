/**
 * Resolve a monochrome tech icon URL (white SVG) for CSS masking.
 * White glyphs + CSS mask + bg-foreground work in light and dark.
 *
 * Root cause notes:
 * - simple-icons has no `java` slug (404) → content uses openjdk
 * - brand-colored SVGs + CSS invert break dark mode → monochrome mask instead
 * - amazonwebservices 404s on cdn.simpleicons.org → jsDelivr package path
 */
const SLUG_OVERRIDES: Record<string, string> = {
  amazonwebservices:
    "https://cdn.jsdelivr.net/npm/simple-icons@14/icons/amazonwebservices.svg",
};

export function techIconUrl(slug: string): string {
  if (SLUG_OVERRIDES[slug]) return SLUG_OVERRIDES[slug];
  // Force white fill so the SVG is a clean mask alpha channel.
  return `https://cdn.simpleicons.org/${encodeURIComponent(slug)}/ffffff`;
}
