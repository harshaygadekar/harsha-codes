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
  };

  return (
    <article className="site-frame page-enter pt-28 pb-16 sm:pt-32 sm:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-10" aria-label="Post">
        <Link href="/writing" className="chrome-link">
          ← writing
        </Link>
      </nav>

      {post.status === "draft" ? (
        <p className="mb-4 font-mono text-[0.72rem] tracking-[0.04em] text-muted-foreground">
          draft preview — only you can see this
        </p>
      ) : null}

      <header className="mb-12">
        <h1 className="font-display text-[2rem] font-normal leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[2.45rem]">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}

        <p className="mt-6 font-mono text-[0.72rem] tracking-[0.04em] text-muted-foreground">
          <span>{portfolio.person.fullName.toLowerCase()}</span>
          <span className="mx-1.5 text-muted-foreground/50" aria-hidden>
            ·
          </span>
          <time dateTime={post.publishedAt ?? post.createdAt}>
            {formatDate(post.publishedAt ?? post.updatedAt)}
          </time>
          {showUpdated(post.publishedAt, post.updatedAt) ? (
            <>
              <span className="mx-1.5 text-muted-foreground/50" aria-hidden>
                ·
              </span>
              <span>
                updated{" "}
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
