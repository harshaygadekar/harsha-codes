import type { Metadata } from "next";
import { isBlogAdmin, isBlogAuthConfigured } from "@/lib/blog/auth";
import { listPosts } from "@/lib/blog/storage";
import { toListItem } from "@/lib/blog/types";
import { LoginForm } from "@/components/blog/login-form";
import { AdminShell } from "@/components/blog/admin-shell";
import { AdminDashboard } from "@/components/blog/admin-dashboard";

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
      <div className="content-column py-14 md:py-20">
        <p className="text-[13px] text-muted-foreground">writing · studio</p>
        <h1 className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
          Sign in to write
        </h1>
        <p className="mt-2 mb-8 max-w-md text-[14px] leading-relaxed text-muted-foreground">
          Only you can publish here. Use the password from your server env.
        </p>
        <LoginForm configured={configured} />
      </div>
    );
  }

  const posts = (await listPosts()).map(toListItem);

  return (
    <AdminShell
      title="Your posts"
      description="Drafts stay private. Publish when a piece is ready."
    >
      <AdminDashboard posts={posts} />
    </AdminShell>
  );
}
