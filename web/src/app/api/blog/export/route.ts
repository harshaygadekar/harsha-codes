import { NextResponse } from "next/server";
import { isBlogAdmin } from "@/lib/blog/auth";
import { listPosts } from "@/lib/blog/storage";

/** Authenticated full backup of all posts as JSON. */
export async function GET() {
  if (!(await isBlogAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const posts = await listPosts();
  const body = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      count: posts.length,
      posts,
    },
    null,
    2,
  );

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="blog-backup-${stamp}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
