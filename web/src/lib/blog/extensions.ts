import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { Video } from "./video-extension";

/** Core extensions for HTML generation (no editor-only plugins). */
export function blogCoreExtensions() {
  return [
    StarterKit.configure({
      heading: { levels: [2, 3] },
      codeBlock: {
        HTMLAttributes: {
          class: "blog-code-block",
        },
      },
    }),
    Underline,
    Typography,
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
      HTMLAttributes: {
        class: "blog-link",
        rel: "noopener noreferrer",
        target: "_blank",
      },
    }),
    Image.configure({
      inline: false,
      allowBase64: false,
      HTMLAttributes: {
        class: "blog-image",
        loading: "lazy",
        // Display size is CSS-capped; avoid full-res layout blowouts
        style: "max-width:100%;height:auto;",
      },
    }),
    Youtube.configure({
      controls: true,
      nocookie: true,
      modestBranding: true,
      HTMLAttributes: {
        class: "blog-youtube",
      },
    }),
    Video,
  ];
}

/** Editor extensions (core + placeholder). */
export function blogExtensions(placeholder = "Start writing…") {
  return [
    ...blogCoreExtensions(),
    Placeholder.configure({
      placeholder,
    }),
  ];
}
