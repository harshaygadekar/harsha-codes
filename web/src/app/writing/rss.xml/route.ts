import { listPublishedPosts } from "@/lib/blog/storage";
import { portfolio } from "@/content/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await listPublishedPosts();

  const items = posts
    .map((post) => {
      const link = `${siteUrl}/writing/${post.slug}`;
      const pub = post.publishedAt ?? post.updatedAt;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(pub).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt || "")}</description>
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${portfolio.person.fullName} — Writing`)}</title>
    <link>${escapeXml(`${siteUrl}/writing`)}</link>
    <description>${escapeXml(portfolio.seo.description)}</description>
    <language>en-in</language>
    <atom:link href="${escapeXml(`${siteUrl}/writing/rss.xml`)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
