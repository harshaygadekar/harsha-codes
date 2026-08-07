import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isBlogAdmin } from "@/lib/blog/auth";
import { blogStudio } from "@/lib/blog/paths";
import { AdminShell } from "@/components/blog/admin-shell";
import { PostForm } from "@/components/blog/post-form";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  if (!(await isBlogAdmin())) {
    redirect(blogStudio.root);
  }

  return (
    <AdminShell
      title="New post"
      description="Write freely. Save drafts often. Publish when it feels finished."
    >
      <PostForm mode="create" />
    </AdminShell>
  );
}
