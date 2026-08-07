import { NextResponse } from "next/server";
import type { JSONContent } from "@tiptap/react";
import { isBlogAdmin } from "@/lib/blog/auth";
import {
  deletePost,
  getPost,
  updatePost,
} from "@/lib/blog/storage";
import {
  contentWithinLimit,
  parseBlogPostBody,
} from "@/lib/blog/validate";
import { clientIp, rateLimit } from "@/lib/blog/rate-limit";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  const post = await getPost(slug);
  if (!post) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  if (post.status !== "published") {
    if (!(await isBlogAdmin())) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
  }

  return NextResponse.json({ ok: true, post });
}

export async function PUT(request: Request, ctx: Ctx) {
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

    const { slug } = await ctx.params;
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const record = raw as Record<string, unknown>;
    const fullish = {
      title: typeof record.title === "string" ? record.title : "Untitled",
      slug: typeof record.slug === "string" ? record.slug : undefined,
      excerpt: typeof record.excerpt === "string" ? record.excerpt : undefined,
      contentJson: record.contentJson ?? { type: "doc", content: [] },
      contentHtml:
        typeof record.contentHtml === "string" ? record.contentHtml : "",
      status:
        record.status === "published" || record.status === "draft"
          ? record.status
          : "draft",
      tags: Array.isArray(record.tags) ? record.tags : undefined,
    };

    const parsed = parseBlogPostBody(fullish);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error },
        { status: 400 },
      );
    }

    if (!contentWithinLimit(parsed.data.contentJson)) {
      return NextResponse.json(
        { ok: false, error: "Content too large." },
        { status: 400 },
      );
    }

    const body = parsed.data;
    const post = await updatePost(slug, {
      title: body.title,
      newSlug: body.slug || undefined,
      excerpt: body.excerpt,
      contentJson: body.contentJson as JSONContent,
      contentHtml: body.contentHtml,
      status: body.status,
      tags: body.tags,
    });

    if (!post) {
      return NextResponse.json(
        { ok: false, error: "Not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, post });
  } catch (err) {
    console.error("[api/blog PUT]", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "Could not update post. Check server logs.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, ctx: Ctx) {
  if (!(await isBlogAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const rl = await rateLimit(`write:${clientIp(request)}`, 60, 60 * 15);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many writes. Slow down." },
      { status: 429 },
    );
  }

  const { slug } = await ctx.params;
  const ok = await deletePost(slug);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
