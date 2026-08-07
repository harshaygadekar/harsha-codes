import { z } from "zod";

export const blogPostBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  slug: z.string().trim().max(80).optional(),
  excerpt: z.string().trim().max(500).optional(),
  // TipTap docs are nested; structural check is enough at the boundary
  contentJson: z.unknown(),
  contentHtml: z.string().max(2_000_000),
  status: z.enum(["draft", "published"]),
  tags: z.array(z.string().trim().min(1).max(32)).max(12).optional(),
});

export type BlogPostBody = z.infer<typeof blogPostBodySchema>;

export function parseBlogPostBody(
  data: unknown,
):
  | { success: true; data: BlogPostBody }
  | { success: false; error: string } {
  const result = blogPostBodySchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  const slug = result.data.slug?.trim();
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { success: false, error: "Invalid slug." };
  }

  return {
    success: true,
    data: {
      ...result.data,
      slug: slug || undefined,
      excerpt: result.data.excerpt?.trim() || undefined,
    },
  };
}

/** Rough size guard for TipTap JSON payload. */
export function contentWithinLimit(json: unknown, maxBytes = 1_000_000): boolean {
  try {
    return JSON.stringify(json).length <= maxBytes;
  } catch {
    return false;
  }
}
