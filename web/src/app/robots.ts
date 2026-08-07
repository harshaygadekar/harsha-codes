import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/writing/hrsh", "/writing/admin", "/api/blog"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
