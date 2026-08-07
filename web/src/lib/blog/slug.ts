/** URL-safe slug from a title (or free-form string). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

export function ensureUniqueSlug(
  base: string,
  existing: string[],
  currentSlug?: string,
): string {
  const root = slugify(base) || "untitled";
  if (currentSlug === root) return root;
  if (!existing.includes(root)) return root;

  let n = 2;
  while (existing.includes(`${root}-${n}`)) n += 1;
  return `${root}-${n}`;
}
