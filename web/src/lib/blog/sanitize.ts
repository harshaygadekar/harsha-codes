import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "blockquote",
  "pre",
  "code",
  "hr",
  "span",
  "img",
  "video",
  "source",
  "iframe",
  "div",
];

const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "class",
  "src",
  "alt",
  "title",
  "width",
  "height",
  "loading",
  "controls",
  "playsinline",
  "poster",
  "allow",
  "allowfullscreen",
  "frameborder",
  "referrerpolicy",
];

const EMBED_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "player.vimeo.com",
];

function isAllowedEmbedSrc(src: string): boolean {
  try {
    const u = new URL(src);
    if (u.protocol !== "https:") return false;
    return EMBED_HOSTS.includes(u.hostname);
  } catch {
    return false;
  }
}

function isSafeMediaSrc(src: string): boolean {
  try {
    const u = new URL(src, "https://example.com");
    // Absolute https, or relative site path
    if (src.startsWith("/") && !src.startsWith("//")) return true;
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

let hooksInstalled = false;

function installHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;

  DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (!(node instanceof Element)) return;

    if (data.tagName === "iframe") {
      const src = node.getAttribute("src") ?? "";
      if (!isAllowedEmbedSrc(src)) {
        node.remove();
      } else {
        node.setAttribute("loading", "lazy");
        node.setAttribute(
          "referrerpolicy",
          "strict-origin-when-cross-origin",
        );
        node.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        );
        node.setAttribute("allowfullscreen", "true");
      }
      return;
    }

    if (data.tagName === "img" || data.tagName === "video") {
      const src = node.getAttribute("src") ?? "";
      if (!src || !isSafeMediaSrc(src) || src.startsWith("data:")) {
        node.remove();
      }
    }
  });
}

/** Sanitize stored HTML before public render. */
export function sanitizeBlogHtml(html: string): string {
  installHooks();
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ["allowfullscreen", "playsinline"],
  });
}
