"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/react";
import { BlogEditor } from "@/components/blog/blog-editor";
import type { BlogPost, BlogStatus } from "@/lib/blog/types";
import { slugify } from "@/lib/blog/slug";
import { emptyDoc } from "@/lib/blog/html";
import { blogStudio } from "@/lib/blog/paths";
import { readApiJson } from "@/lib/blog/api-client";

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
    <div className="space-y-7">
      <p className="text-[13px] text-muted-foreground" aria-live="polite">
        {status === "draft" ? (
          autoState === "saving" ? (
            "saving…"
          ) : autoState === "saved" && autoAt ? (
            <>saved · {autoAt}</>
          ) : autoState === "error" ? (
            "autosave failed — hit save draft"
          ) : (
            "drafts autosave while you write"
          )
        ) : (
          "published — update to save changes"
        )}
      </p>

      <div>
        <label htmlFor="post-title" className="block text-[13px] text-muted-foreground mb-1">
          title
        </label>
        <input
          id="post-title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="a clear title"
          className="field-ink text-[1.15rem] sm:text-xl font-medium tracking-tight"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="post-slug" className="block text-[13px] text-muted-foreground mb-1">
            slug
          </label>
          <input
            id="post-slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              dirty.current = true;
              setSlug(slugify(e.target.value));
            }}
            placeholder="url-friendly-slug"
            className="field-ink font-mono text-[13px]"
          />
        </div>
        <div>
          <p className="text-[13px] text-muted-foreground mb-1">status</p>
          <p className="pt-2 text-[14px] text-foreground/80">{status}</p>
        </div>
      </div>

      <div>
        <label htmlFor="post-excerpt" className="block text-[13px] text-muted-foreground mb-1">
          excerpt <span className="text-muted-foreground/60">(optional)</span>
        </label>
        <textarea
          id="post-excerpt"
          value={excerpt}
          onChange={(e) => {
            dirty.current = true;
            setExcerpt(e.target.value);
          }}
          rows={2}
          placeholder="one or two lines for the writings list"
          className="field-ink resize-y min-h-[3.5rem]"
        />
      </div>

      <div>
        <p className="text-[13px] text-muted-foreground mb-2">body</p>
        <BlogEditor
          initialContent={initial?.contentJson}
          onChange={onEditorChange}
        />
      </div>

      {error || message ? (
        <p
          className={
            error ? "text-[13px] text-destructive" : "text-[13px] text-muted-foreground"
          }
          role="status"
        >
          {error || message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-1">
        <button
          type="button"
          className="blue-link"
          disabled={saving || !title.trim()}
          onClick={() => save("draft")}
        >
          {saving ? "saving…" : "save draft"}
        </button>
        <button
          type="button"
          className="blue-link"
          disabled={saving || !title.trim()}
          onClick={() => save("published")}
        >
          {status === "published" ? "update" : "publish"}
        </button>
        {mode === "edit" && status === "published" ? (
          <button
            type="button"
            className="blue-link"
            disabled={saving}
            onClick={() => save("draft")}
          >
            unpublish
          </button>
        ) : null}
        {mode === "edit" ? (
          <button
            type="button"
            className="blue-link"
            disabled={saving}
            onClick={remove}
          >
            delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
