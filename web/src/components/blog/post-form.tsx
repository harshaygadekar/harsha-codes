"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/react";
import { BlogEditor } from "@/components/blog/blog-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPost, BlogStatus } from "@/lib/blog/types";
import { slugify } from "@/lib/blog/slug";
import { emptyDoc } from "@/lib/blog/html";
import { blogStudio } from "@/lib/blog/paths";
import { readApiJson } from "@/lib/blog/api-client";
import { cn } from "@/lib/utils";

interface PostFormProps {
  mode: "create" | "edit";
  initial?: BlogPost;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export function PostForm({ mode, initial }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [tagsInput, setTagsInput] = useState(
    (initial?.tags ?? []).join(", "),
  );
  const [contentJson, setContentJson] = useState<JSONContent>(
    initial?.contentJson ?? emptyDoc(),
  );
  const [contentHtml, setContentHtml] = useState(initial?.contentHtml ?? "");
  const [status, setStatus] = useState<BlogStatus>(initial?.status ?? "draft");
  const [currentSlug, setCurrentSlug] = useState(initial?.slug ?? "");
  const [saving, setSaving] = useState(false);
  const [autoState, setAutoState] = useState<SaveState>("idle");
  const [autoAt, setAutoAt] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveQueue = useRef(Promise.resolve());
  const dirty = useRef(false);

  const tags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput],
  );

  const onTitleChange = (value: string) => {
    setTitle(value);
    dirty.current = true;
    if (!slugTouched) setSlug(slugify(value));
  };

  const onEditorChange = useCallback((json: JSONContent, html: string) => {
    setContentJson(json);
    setContentHtml(html);
    dirty.current = true;
  }, []);

  const payload = useCallback(
    (nextStatus?: BlogStatus) => ({
      title: title.trim() || "Untitled",
      slug: slug || undefined,
      excerpt,
      contentJson,
      contentHtml,
      status: nextStatus ?? status,
      tags,
    }),
    [title, slug, excerpt, contentJson, contentHtml, status, tags],
  );

  const persist = useCallback(
    async (opts: {
      nextStatus?: BlogStatus;
      silent?: boolean;
      navigate?: boolean;
    }) => {
      const body = payload(opts.nextStatus);
      if (!body.title.trim()) {
        if (!opts.silent) setError("Title is required.");
        return null;
      }

      if (!opts.silent) {
        setSaving(true);
        setError("");
        setMessage("");
      } else {
        setAutoState("saving");
      }

      try {
        const isEdit = mode === "edit" || Boolean(currentSlug);
        const res = isEdit
          ? await fetch(`/api/blog/${currentSlug || initial?.slug}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
          : await fetch("/api/blog", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });

        const json = await readApiJson<{
          ok?: boolean;
          error?: string;
          post?: BlogPost;
        }>(res);

        if (!res.ok || !json.ok || !json.post) {
          throw new Error(json.error ?? "Could not save post.");
        }

        dirty.current = false;
        setStatus(json.post.status);
        setSlug(json.post.slug);
        setCurrentSlug(json.post.slug);
        setTagsInput((json.post.tags ?? []).join(", "));

        if (opts.silent) {
          setAutoState("saved");
          setAutoAt(
            new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
        } else {
          setMessage(
            json.post.status === "published" ? "Published." : "Draft saved.",
          );
        }

        // Navigate after create (once) without aborting the happy path
        if (
          opts.navigate &&
          (mode === "create" || json.post.slug !== initial?.slug)
        ) {
          router.replace(blogStudio.edit(json.post.slug));
          router.refresh();
        } else if (opts.navigate) {
          router.refresh();
        }

        return json.post;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return null;
        const msg = err instanceof Error ? err.message : "Save failed.";
        if (opts.silent) setAutoState("error");
        else setError(msg);
        return null;
      } finally {
        if (!opts.silent) setSaving(false);
      }
    },
    [payload, mode, currentSlug, initial?.slug, router],
  );

  // Autosave drafts only
  useEffect(() => {
    if (status !== "draft") return;
    if (!dirty.current && mode === "edit") {
      // still allow when content changes tracked via dirty
    }

    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      if (!dirty.current && mode === "edit") return;
      if (!title.trim() && mode === "create") return;
      // only autosave draft status
      saveQueue.current = saveQueue.current.then(() =>
        persist({ nextStatus: "draft", silent: true, navigate: mode === "create" }).then(
          () => undefined,
        ),
      );
    }, 1800);

    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [title, slug, excerpt, tagsInput, contentJson, contentHtml, status, mode, persist]);

  async function save(nextStatus: BlogStatus) {
    await persist({
      nextStatus,
      silent: false,
      navigate: true,
    });
  }

  async function remove() {
    if (mode !== "edit" || !initial) return;
    if (!window.confirm(`Delete “${initial.title}”? This cannot be undone.`)) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/blog/${currentSlug || initial.slug}`, {
        method: "DELETE",
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Delete failed.");
      router.push(blogStudio.root);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[12px] text-muted-foreground" aria-live="polite">
          {status === "draft" ? (
            autoState === "saving" ? (
              "Autosaving…"
            ) : autoState === "saved" && autoAt ? (
              <>Saved · {autoAt}</>
            ) : autoState === "error" ? (
              "Autosave failed — use Save draft"
            ) : (
              "Drafts autosave while you write"
            )
          ) : (
            "Published — use Update to save changes"
          )}
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="post-title" className="text-[13px] text-muted-foreground">
          title
        </label>
        <Input
          id="post-title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="A clear, human title"
          className="h-12 border-border/70 bg-card/40 text-xl font-medium tracking-tight sm:text-2xl"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="post-slug" className="text-[13px] text-muted-foreground">
            slug
          </label>
          <Input
            id="post-slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              dirty.current = true;
              setSlug(slugify(e.target.value));
            }}
            placeholder="url-friendly-slug"
            className="border-border/70 bg-card/40 font-mono text-[13px]"
          />
        </div>
        <div className="space-y-1.5">
          <span className="text-[13px] text-muted-foreground">status</span>
          <div className="flex h-9 items-center gap-2 text-[13px]">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5",
                status === "published"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="post-tags" className="text-[13px] text-muted-foreground">
          tags{" "}
          <span className="text-muted-foreground/60">
            (comma-separated, e.g. backend, ai)
          </span>
        </label>
        <Input
          id="post-tags"
          value={tagsInput}
          onChange={(e) => {
            dirty.current = true;
            setTagsInput(e.target.value);
          }}
          placeholder="backend, ai, systems"
          className="border-border/70 bg-card/40 text-[14px]"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="post-excerpt"
          className="text-[13px] text-muted-foreground"
        >
          excerpt{" "}
          <span className="text-muted-foreground/60">(optional — auto if empty)</span>
        </label>
        <Textarea
          id="post-excerpt"
          value={excerpt}
          onChange={(e) => {
            dirty.current = true;
            setExcerpt(e.target.value);
          }}
          rows={2}
          placeholder="One or two lines that appear on the writing index."
          className="resize-y border-border/70 bg-card/40 text-[14px]"
        />
      </div>

      <div className="space-y-1.5">
        <p className="text-[13px] text-muted-foreground">body</p>
        <BlogEditor
          initialContent={initial?.contentJson}
          onChange={onEditorChange}
        />
      </div>

      {(error || message) && (
        <p
          className={cn(
            "text-[13px]",
            error ? "text-destructive" : "text-muted-foreground",
          )}
          role="status"
        >
          {error || message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-5">
        <Button
          type="button"
          disabled={saving || !title.trim()}
          onClick={() => save("draft")}
          variant="outline"
        >
          {saving ? "Saving…" : "Save draft"}
        </Button>
        <Button
          type="button"
          disabled={saving || !title.trim()}
          onClick={() => save("published")}
        >
          {status === "published" ? "Update & publish" : "Publish"}
        </Button>
        {mode === "edit" && status === "published" ? (
          <Button
            type="button"
            variant="ghost"
            disabled={saving}
            onClick={() => save("draft")}
          >
            Unpublish
          </Button>
        ) : null}
        {mode === "edit" ? (
          <Button
            type="button"
            variant="destructive"
            disabled={saving}
            onClick={remove}
            className="sm:ml-auto"
          >
            Delete
          </Button>
        ) : null}
      </div>
    </div>
  );
}
