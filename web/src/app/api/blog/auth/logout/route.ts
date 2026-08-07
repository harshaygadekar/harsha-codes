import { NextResponse } from "next/server";
import { BLOG_SESSION_COOKIE, sessionCookieOptions } from "@/lib/blog/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BLOG_SESSION_COOKIE, "", {
    ...sessionCookieOptions(0),
    maxAge: 0,
  });
  return res;
}
