import { NextResponse } from "next/server";
import {
  createSessionToken,
  isBlogAuthConfigured,
  sessionCookieOptions,
  verifyPassword,
  BLOG_SESSION_COOKIE,
} from "@/lib/blog/auth";
import { clientIp, rateLimit } from "@/lib/blog/rate-limit";

export async function POST(request: Request) {
  if (!isBlogAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Blog admin is not configured. Set BLOG_ADMIN_PASSWORD (min 8 chars) and BLOG_SESSION_SECRET (min 16 chars) in env.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const rl = await rateLimit(`login:${ip}`, 5, 60 * 15);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a few minutes." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const password = String(body.password ?? "");
  if (!verifyPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 },
    );
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BLOG_SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
