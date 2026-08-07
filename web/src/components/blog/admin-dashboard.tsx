"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BlogPostListItem } from "@/lib/blog/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { blogStudio } from "@/lib/blog/paths";
import { cn } from "@/lib/utils";

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
    if (!window.confirm(`Delete “${title}”?`)) return;
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted-foreground">
          {posts.length} post{posts.length === 1 ? "" : "s"}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="/api/blog/export"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Export backup
          </a>
          <Link
            href={blogStudio.new}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            New post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 px-5 py-12 text-center">
          <p className="text-[15px] text-foreground/90">No posts yet.</p>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Write your first note — drafts stay private until you publish.
          </p>
          <Link
            href={blogStudio.new}
            className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
          >
            Start writing
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-border/70">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[15px] font-medium tracking-tight">
                    {post.title}
                  </h2>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px]",
                      post.status === "published"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  /{post.slug} · updated {formatDate(post.updatedAt)}
                </p>
                {post.excerpt ? (
                  <p className="mt-1.5 max-w-lg text-[13.5px] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {post.status === "published" ? (
                  <Link
                    href={`/writing/${post.slug}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                    )}
                  >
                    View
                  </Link>
                ) : null}
                <Link
                  href={blogStudio.edit(post.slug)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                  )}
                >
                  Edit
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={busySlug === post.slug}
                  onClick={() => remove(post.slug, post.title)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
