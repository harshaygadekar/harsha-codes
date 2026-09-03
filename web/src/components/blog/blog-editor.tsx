"use client";

import { useEditor, EditorContent, type JSONContent, type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  Link2,
  Minus,
  Undo2,
  Redo2,
  Pilcrow,
  ImageIcon,
  Clapperboard,
  Film,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { blogExtensions } from "@/lib/blog/extensions";
import { cn } from "@/lib/utils";

interface BlogEditorProps {
  initialContent?: JSONContent;
  onChange?: (json: JSONContent, html: string) => void;
  className?: string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-35",
        active && "bg-muted text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <span className="mx-0.5 h-5 w-px bg-border/80" aria-hidden />;
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

async function uploadFile(
  file: File,
): Promise<{ url: string; kind: "image" | "video" } | null> {
  const form = new FormData();
  form.append("file", file);
  try {
    const res = await fetch("/api/blog/upload", { method: "POST", body: form });
    const text = await res.text();
    if (!text.trim()) {
      window.alert(
        `Upload failed (empty response ${res.status}). Are you signed in?`,
      );
      return null;
    }
    const json = JSON.parse(text) as {
      ok?: boolean;
      url?: string;
      kind?: "image" | "video";
      error?: string;
    };
    if (!res.ok || !json.ok || !json.url || !json.kind) {
      window.alert(json.error ?? "Upload failed.");
      return null;
    }
    return { url: json.url, kind: json.kind };
  } catch (err) {
    window.alert(
      err instanceof Error ? err.message : "Upload failed. Try again.",
    );
    return null;
  }
}

function insertMedia(editor: Editor, url: string, kind: "image" | "video", alt?: string) {
  if (kind === "image") {
    editor.chain().focus().setImage({ src: url, alt: alt || undefined }).run();
  } else {
    editor.chain().focus().setVideo({ src: url }).run();
  }
}

export function BlogEditor({
  initialContent,
  onChange,
  className,
}: BlogEditorProps) {
  const editorRef = useRef<Editor | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: blogExtensions(
      "Start writing… paste ✨ emojis anytime",
    ),
    content: initialContent ?? {
      type: "doc",
      content: [{ type: "paragraph" }],
    },
    editorProps: {
      attributes: {
        class:
          "blog-prose blog-prose-editor min-h-[28rem] px-1 py-2 outline-none focus:outline-none",
      },
      handlePaste: (_view, event) => {
        const text = event.clipboardData?.getData("text/plain")?.trim();
        const ed = editorRef.current;
        if (!text || !ed) return false;
        if (
          /^https?:\/\/\S+\.(gif|png|jpe?g|webp|avif|svg)(\?\S*)?$/i.test(text)
        ) {
          event.preventDefault();
          ed.chain().focus().setImage({ src: text }).run();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getJSON(), ed.getHTML());
    },
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  useEffect(() => {
    if (!editor || !initialContent) return;
    const current = JSON.stringify(editor.getJSON());
    const next = JSON.stringify(initialContent);
    if (current !== next) {
      editor.commands.setContent(initialContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, initialContent]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  }, [editor]);

  const insertImageUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image or GIF URL (https://…)", "https://");
    if (!url?.trim() || !isHttpUrl(url.trim())) return;
    const alt =
      window.prompt("Alt text (for accessibility)", "") ?? "";
    editor
      .chain()
      .focus()
      .setImage({ src: url.trim(), alt: alt.trim() || undefined })
      .run();
  }, [editor]);

  const insertYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt(
      "YouTube URL\n(e.g. https://www.youtube.com/watch?v=…)",
      "https://",
    );
    if (!url?.trim()) return;
    editor.commands.setYoutubeVideo({ src: url.trim() });
  }, [editor]);

  const insertVideoUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Direct video file URL (mp4 / webm)", "https://");
    if (!url?.trim() || !isHttpUrl(url.trim())) return;
    editor.chain().focus().setVideo({ src: url.trim() }).run();
  }, [editor]);

  const onFilePicked = useCallback(
    async (file: File | undefined, expect: "image" | "video") => {
      if (!file || !editor) return;
      const result = await uploadFile(file);
      if (!result) return;
      if (expect === "image" && result.kind !== "image") {
        window.alert("Please choose an image file.");
        return;
      }
      if (expect === "video" && result.kind !== "video") {
        window.alert("Please choose a video file.");
        return;
      }
      const alt =
        result.kind === "image"
          ? window.prompt("Alt text (for accessibility)", file.name) ?? file.name
          : undefined;
      insertMedia(editor, result.url, result.kind, alt ?? undefined);
    },
    [editor],
  );

  if (!editor) {
    return (
      <div
        className={cn(
          "py-8 text-[13px] text-muted-foreground",
          className,
        )}
      >
        loading editor…
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
    >
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          void onFilePicked(e.target.files?.[0], "image");
          e.target.value = "";
        }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          void onFilePicked(e.target.files?.[0], "video");
          e.target.value = "";
        }}
      />

      <div
        className="flex flex-wrap items-center gap-0.5 border-b border-border px-0 py-1.5"
        role="toolbar"
        aria-label="Formatting"
      >
        <ToolbarButton
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Inline code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="size-3.5" />
        </ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton
          label="Paragraph"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="size-3.5" />
        </ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Divider"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <Link2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton
          label="Upload image or GIF"
          onClick={() => imageInputRef.current?.click()}
        >
          <Upload className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Image URL" onClick={insertImageUrl}>
          <ImageIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton label="YouTube" onClick={insertYoutube}>
          <Clapperboard className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          label="Upload video"
          onClick={() => videoInputRef.current?.click()}
        >
          <Film className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Video file URL" onClick={insertVideoUrl}>
          <Film className="size-3.5 opacity-60" />
        </ToolbarButton>
      </div>

      <div className="px-3 py-3 sm:px-5 sm:py-4">
        <EditorContent editor={editor} />
      </div>

      <p className="border-t border-border/50 px-3 py-2 text-[11.5px] leading-relaxed text-muted-foreground/80 sm:px-5">
        Upload images/GIFs/videos from your device, or paste URLs. YouTube embeds
        supported. Emojis via keyboard (Win + .). Hosted files go to Vercel Blob
        in production, or local uploads in dev.
      </p>
    </div>
  );
}
