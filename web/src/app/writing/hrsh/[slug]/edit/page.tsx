import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isBlogAdmin } from "@/lib/blog/auth";
import { getPost } from "@/lib/blog/storage";
import { blogStudio } from "@/lib/blog/paths";
import { AdminShell } from "@/components/blog/admin-shell";
import { PostForm } from "@/components/blog/post-form";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = {
  title: "Edit post",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: Props) {
  if (!(await isBlogAdmin())) {
    redirect(blogStudio.root);
  }

  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <AdminShell
      title="Edit post"
      description={`Editing /${post.slug}`}
    >
      <PostForm mode="edit" initial={post} />
    </AdminShell>
  );
}
