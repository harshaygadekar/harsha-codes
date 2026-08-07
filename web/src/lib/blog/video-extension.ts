import { Node, mergeAttributes } from "@tiptap/core";

export interface VideoOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /** Insert a direct video file (mp4 / webm / etc.) by URL. */
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}

/** Block video player for hosted files (mp4, webm). GIFs use Image instead. */
export const Video = Node.create<VideoOptions>({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "blog-video",
        controls: true,
        playsinline: true,
      },
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).getAttribute("src"),
        renderHTML: (attrs) => (attrs.src ? { src: attrs.src } : {}),
      },
      poster: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).getAttribute("poster"),
        renderHTML: (attrs) => (attrs.poster ? { poster: attrs.poster } : {}),
      },
    };
  },

  parseHTML() {
    return [{ tag: "video[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        controls: true,
        playsinline: "",
      }),
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          if (!options.src?.trim()) return false;
          return commands.insertContent({
            type: this.name,
            attrs: { src: options.src.trim() },
          });
        },
    };
  },
});
