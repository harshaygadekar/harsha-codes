import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/react";
import { blogCoreExtensions } from "./extensions";

/** Convert TipTap JSON → HTML (server-safe). */
export function contentJsonToHtml(doc: JSONContent): string {
  if (!doc || typeof doc !== "object") return "";
  try {
    return generateHTML(doc, blogCoreExtensions());
  } catch {
    return "";
  }
}

/** Pull a plain-text excerpt from TipTap JSON. */
export function excerptFromJson(doc: JSONContent, max = 160): string {
  const parts: string[] = [];

  function walk(node: JSONContent) {
    if (node.type === "text" && node.text) {
      parts.push(node.text);
    }
    if (node.content) {
      for (const child of node.content) walk(child);
    }
  }

  walk(doc);
  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function emptyDoc(): JSONContent {
  return {
    type: "doc",
    content: [{ type: "paragraph" }],
  };
}
