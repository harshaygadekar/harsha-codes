import { sanitizeBlogHtml } from "@/lib/blog/sanitize";

export function PostBody({ html }: { html: string }) {
  const clean = sanitizeBlogHtml(html);
  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
