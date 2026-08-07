import type { JSONContent } from "@tiptap/react";

export type BlogStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** TipTap document JSON — source of truth for editing */
  contentJson: JSONContent;
  /** Sanitized HTML snapshot for public rendering */
  contentHtml: string;
  status: BlogStatus;
  /** Topic tags for filters (e.g. backend, ai) */
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt?: string;
  contentJson: JSONContent;
  contentHtml: string;
  status: BlogStatus;
  tags?: string[];
}

export interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: BlogStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
}

export function toListItem(post: BlogPost): BlogPostListItem {
  const p = normalizePost(post);
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    status: p.status,
    tags: p.tags,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    publishedAt: p.publishedAt,
  };
}

/** Normalize free-form tag input → unique lowercase slugs. */
export function normalizeTags(input: string[] | undefined): string[] {
  if (!input?.length) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of input) {
    const t = raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 32);
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
    if (out.length >= 12) break;
  }
  return out;
}
