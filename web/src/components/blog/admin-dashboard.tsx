"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BlogPostListItem } from "@/lib/blog/types";
import { blogStudio } from "@/lib/blog/paths";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminDashboard({ posts }: { posts: BlogPostListItem[] }) {
  const router = useRouter();
  const [busySlug, setBusySlug] = useState<string | null>(null);

  async function remove(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setBusySlug(slug);
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-6 text-[13.5px] sm:text-sm">
        <p className="text-muted-foreground">
          {posts.length} post{posts.length === 1 ? "" : "s"}
        </p>
        <div className="flex items-baseline gap-x-3">
          <a href="/api/blog/export" className="blue-link">
            export
          </a>
          <Link href={blogStudio.new} className="blue-link">
            new post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-[14px] sm:text-[14.5px] text-muted-foreground">
          nothing yet.{" "}
          <Link href={blogStudio.new} className="blue-link">
            write one
          </Link>
          .
        </p>
      ) : (
        <ul className="space-y-5 text-[14px] sm:text-[14.5px] leading-relaxed">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <Link
                  href={blogStudio.edit(post.slug)}
                  className="blue-link font-medium"
                >
                  {post.title.toLowerCase()}
                </Link>
                <span className="text-xs text-muted-foreground font-mono">
                  {post.status} · {formatDate(post.updatedAt)}
                </span>
              </div>
              {post.excerpt ? (
                <p className="mt-1 text-foreground/80">{post.excerpt}</p>
              ) : null}
              <p className="mt-1.5 flex flex-wrap gap-x-3 text-[13px]">
                {post.status === "published" ? (
                  <Link href={`/writing/${post.slug}`} className="blue-link">
                    view
                  </Link>
                ) : null}
                <Link href={blogStudio.edit(post.slug)} className="blue-link">
                  edit
                </Link>
                <button
                  type="button"
                  className="blue-link"
                  disabled={busySlug === post.slug}
                  onClick={() => remove(post.slug, post.title)}
                >
                  {busySlug === post.slug ? "…" : "delete"}
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
