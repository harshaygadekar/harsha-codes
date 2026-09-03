import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedPosts } from "@/lib/blog/storage";
import { portfolio } from "@/content/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  title: "Writings",
  description: `Notes by ${portfolio.person.fullName}.`,
  alternates: { canonical: `${siteUrl}/writing` },
  openGraph: {
    title: `Writings · ${portfolio.person.firstName.toLowerCase()}`,
    description: `Notes by ${portfolio.person.fullName}.`,
    url: `${siteUrl}/writing`,
    type: "website",
  },
};

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function railYear(iso: string | null) {
  if (!iso) return "—";
  return String(new Date(iso).getFullYear());
}

export default async function WritingPage() {
  const posts = await listPublishedPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${portfolio.person.fullName} — Writing`,
    url: `${siteUrl}/writing`,
    author: {
      "@type": "Person",
      name: portfolio.person.fullName,
    },
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteUrl}/writing/${p.slug}`,
      datePublished: p.publishedAt ?? p.createdAt,
      dateModified: p.updatedAt,
    })),
  };

  return (
    <div className="site-frame pt-12 pb-16 sm:pt-20 sm:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-baseline justify-between mb-2">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans lowercase hover:opacity-80 transition-opacity"
        >
          {portfolio.person.fullName.toLowerCase()}
        </Link>
        <Link
          href="/"
          className="blue-link text-sm sm:text-base font-sans"
        >
          ← home
        </Link>
      </header>

      <div className="flex flex-wrap items-center gap-x-2 text-[13.5px] sm:text-sm text-muted-foreground mb-6">
        <span className="font-semibold text-foreground">writings</span>
        <span className="text-muted-foreground/60 select-none">|</span>
        <span>notes, when i've got something worth writing down</span>
      </div>

      {posts.length === 0 ? (
        <p className="text-[14px] sm:text-[14.5px] text-muted-foreground">
          nothing here yet.{" "}
          <Link
            href="/"
            className="blue-link"
          >
            go home
          </Link>
          .
        </p>
      ) : (
        <ul className="space-y-6 text-[14px] sm:text-[14.5px] leading-relaxed">
          {posts.map((post) => (
            <li key={post.id} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <Link
                  href={`/writing/${post.slug}`}
                  className="blue-link text-base font-semibold"
                >
                  {post.title.toLowerCase()}
                </Link>
                <span className="text-xs text-muted-foreground font-mono">
                  {railYear(post.publishedAt ?? post.updatedAt)} ·{" "}
                  {formatDate(post.publishedAt ?? post.updatedAt)}
                </span>
              </div>
              {post.excerpt ? (
                <p className="text-foreground/80 text-[14px] sm:text-[14.5px]">
                  {post.excerpt}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
