import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedPosts } from "@/lib/blog/storage";
import { portfolio } from "@/content/portfolio";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  title: "Writing",
  description: `Notes and essays by ${portfolio.person.fullName} on backend engineering, AI systems, and building durable software.`,
  alternates: { canonical: `${siteUrl}/writing` },
  openGraph: {
    title: `Writing · ${portfolio.brand}`,
    description: `Notes and essays by ${portfolio.person.fullName}.`,
    url: `${siteUrl}/writing`,
    type: "website",
  },
};

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function WritingPage({ searchParams }: Props) {
  const { tag: rawTag } = await searchParams;
  const activeTag = rawTag?.trim().toLowerCase() || null;
  const all = await listPublishedPosts();
  const tagSet = new Set<string>();
  for (const p of all) for (const t of p.tags ?? []) tagSet.add(t);
  const tags = Array.from(tagSet).sort();

  const posts = activeTag
    ? all.filter((p) => (p.tags ?? []).includes(activeTag))
    : all;

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
    <div className="reading-column py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-10">
        <p className="text-[13px] text-muted-foreground">writing</p>
        <h1 className="mt-1 text-3xl font-medium tracking-tight sm:text-4xl">
          Notes & essays
        </h1>
        <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
          Short pieces on backend engineering, AI systems, and building things
          that last.
        </p>
      </div>

      {tags.length > 0 ? (
        <nav
          aria-label="Filter by tag"
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <Link
            href="/writing"
            className={cn(
              "rounded-full px-3 py-1 text-[12px] transition-colors",
              !activeTag
                ? "bg-foreground text-background"
                : "border border-border/80 text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </Link>
          {tags.map((t) => (
            <Link
              key={t}
              href={`/writing?tag=${encodeURIComponent(t)}`}
              className={cn(
                "rounded-full px-3 py-1 text-[12px] transition-colors",
                activeTag === t
                  ? "bg-foreground text-background"
                  : "border border-border/80 text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </Link>
          ))}
        </nav>
      ) : null}

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/70 px-5 py-14 text-center">
          <p className="text-[15px] text-foreground/90">
            {activeTag ? `No posts tagged “${activeTag}”.` : "Nothing published yet."}
          </p>
          <p className="mt-1.5 text-[14px] text-muted-foreground">
            {activeTag
              ? "Try another filter."
              : "Check back soon — drafts are cooking offline."}
          </p>
          {activeTag ? (
            <Link
              href="/writing"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-6",
              )}
            >
              Clear filter
            </Link>
          ) : (
            <Link
              href="/#hero"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-6",
              )}
            >
              Back home
            </Link>
          )}
        </div>
      ) : (
        <Reveal variant="stagger" as="ul" className="divide-y divide-border/70">
          {posts.map((post) => (
            <RevealItem key={post.id} as="li">
              <Link
                href={`/writing/${post.slug}`}
                className="group row-hover -mx-3 block rounded-lg px-3 py-6 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <p className="text-[12px] tabular-nums text-muted-foreground">
                  {formatDate(post.publishedAt ?? post.updatedAt)}
                </p>
                <h2 className="mt-2 text-[1.2rem] font-medium leading-snug tracking-tight text-foreground sm:text-[1.35rem]">
                  {post.title}
                </h2>
                {post.excerpt ? (
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                ) : null}
                {(post.tags ?? []).length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span key={t} className="tech-chip text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      )}
    </div>
  );
}
