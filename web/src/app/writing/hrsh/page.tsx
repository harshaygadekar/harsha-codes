import type { Metadata } from "next";
import Link from "next/link";
import { isBlogAdmin, isBlogAuthConfigured } from "@/lib/blog/auth";
import { listPosts } from "@/lib/blog/storage";
import { toListItem } from "@/lib/blog/types";
import { LoginForm } from "@/components/blog/login-form";
import { AdminShell } from "@/components/blog/admin-shell";
import { AdminDashboard } from "@/components/blog/admin-dashboard";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Writing studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function WritingStudioPage() {
  const configured = isBlogAuthConfigured();
  const admin = await isBlogAdmin();

  if (!admin) {
    return (
      <div className="site-frame pt-12 pb-16 sm:pt-20 sm:pb-24">
        <header className="flex items-baseline justify-between mb-2">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans lowercase hover:opacity-80"
          >
            {portfolio.person.fullName.toLowerCase()}
          </Link>
          <Link
            href="/writing"
            className="blue-link text-sm sm:text-base font-sans"
          >
            writings
          </Link>
        </header>

        <div className="flex flex-wrap items-center gap-x-2 text-[13.5px] sm:text-sm text-muted-foreground mb-8">
          <span className="font-semibold text-foreground">studio</span>
          <span className="text-muted-foreground/60 select-none">|</span>
          <span>sign in to write</span>
        </div>

        <LoginForm configured={configured} />
      </div>
    );
  }

  const posts = (await listPosts()).map(toListItem);

  return (
    <AdminShell title="your posts" description="drafts stay private until you publish">
      <AdminDashboard posts={posts} />
    </AdminShell>
  );
}
