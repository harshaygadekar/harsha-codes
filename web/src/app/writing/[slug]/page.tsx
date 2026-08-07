import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/blog/storage";
import { isBlogAdmin } from "@/lib/blog/auth";
import { PostBody } from "@/components/blog/post-body";
import { portfolio } from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };

  const admin = await isBlogAdmin();
  if (post.status !== "published" && !admin) {
    return { title: "Not found" };
  }

  const url = `${siteUrl}/writing/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [portfolio.person.fullName],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    robots:
      post.status === "published"
        ? { index: true, follow: true }
        : { index: false, follow: false },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function showUpdated(publishedAt: string | null, updatedAt: string): boolean {
  if (!publishedAt) return false;
  const p = new Date(publishedAt).getTime();
  const u = new Date(updatedAt).getTime();
  return u - p > 24 * 60 * 60 * 1000;
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  const admin = await isBlogAdmin();

  if (!post) notFound();
  if (post.status !== "published" && !admin) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: portfolio.person.fullName,
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/writing/${post.slug}`,
    keywords: (post.tags ?? []).join(", "),
  };

  return (
    <article className="reading-column py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-10" aria-label="Post">
        <Link
          href="/writing"
          className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← writing
        </Link>
      </nav>

      {post.status === "draft" ? (
        <p className="mb-4 inline-flex rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[12px] text-amber-800 dark:text-amber-300">
          draft preview — only you can see this
        </p>
      ) : null}

      <header className="mb-12">
        {(post.tags ?? []).length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/writing?tag=${encodeURIComponent(t)}`}
                className="tech-chip hover:border-foreground/20"
              >
                {t}
              </Link>
            ))}
          </div>
        ) : null}

        <h1 className="text-[2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[2.5rem]">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mt-5 max-w-2xl text-[1.125rem] leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}

        <p className="mt-6 text-[13px] text-muted-foreground">
          <span>{portfolio.person.fullName}</span>
          <span className="mx-1.5 text-muted-foreground/40" aria-hidden>
            ·
          </span>
          <time dateTime={post.publishedAt ?? post.createdAt}>
            {formatDate(post.publishedAt ?? post.updatedAt)}
          </time>
          {showUpdated(post.publishedAt, post.updatedAt) ? (
            <>
              <span className="mx-1.5 text-muted-foreground/40" aria-hidden>
                ·
              </span>
              <span>
                Updated{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </span>
            </>
          ) : null}
        </p>
      </header>

      <PostBody html={post.contentHtml} />
    </article>
  );
}
