import { NextResponse } from "next/server";
import { isBlogAdmin } from "@/lib/blog/auth";
import { createPost, listPosts, listPublishedPosts } from "@/lib/blog/storage";
import { toListItem } from "@/lib/blog/types";
import { emptyDoc } from "@/lib/blog/html";
import {
  contentWithinLimit,
  parseBlogPostBody,
} from "@/lib/blog/validate";
import { clientIp, rateLimit } from "@/lib/blog/rate-limit";
import type { JSONContent } from "@tiptap/react";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const admin = await isBlogAdmin();

  if (all && !admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const posts = all && admin ? await listPosts() : await listPublishedPosts();
  return NextResponse.json({
    ok: true,
    posts: posts.map(toListItem),
  });
}

export async function POST(request: Request) {
  try {
    if (!(await isBlogAdmin())) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized. Sign in again at /writing/hrsh." },
        { status: 401 },
      );
    }

    const rl = await rateLimit(`write:${clientIp(request)}`, 60, 60 * 15);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many writes. Slow down." },
        { status: 429 },
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const parsed = parseBlogPostBody(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error },
        { status: 400 },
      );
    }

    const body = parsed.data;
    if (!contentWithinLimit(body.contentJson)) {
      return NextResponse.json(
        { ok: false, error: "Content too large." },
        { status: 400 },
      );
    }

    const post = await createPost({
      title: body.title,
      slug: body.slug || undefined,
      excerpt: body.excerpt,
      contentJson: (body.contentJson as JSONContent) ?? emptyDoc(),
      contentHtml: body.contentHtml ?? "",
      status: body.status,
      tags: body.tags,
    });

    return NextResponse.json({ ok: true, post }, { status: 201 });
  } catch (err) {
    console.error("[api/blog POST]", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "Could not save post. Check server logs.",
      },
      { status: 500 },
    );
  }
}
