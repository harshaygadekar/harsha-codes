import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const BLOG_SESSION_COOKIE = "hc_blog_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

function password(): string | null {
  const p = process.env.BLOG_ADMIN_PASSWORD?.trim();
  return p && p.length >= 8 ? p : null;
}

function secret(): string | null {
  const s =
    process.env.BLOG_SESSION_SECRET?.trim() ||
    process.env.BLOG_ADMIN_PASSWORD?.trim();
  return s && s.length >= 16 ? s : null;
}

export function isBlogAuthConfigured(): boolean {
  return Boolean(password() && secret());
}

function sign(payload: string): string {
  const key = secret();
  if (!key) throw new Error("Blog session secret is not configured");
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Create a signed session token. */
export function createSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const body = `blog:${exp}`;
  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !secret()) return false;
  const i = token.lastIndexOf(".");
  if (i <= 0) return false;
  const body = token.slice(0, i);
  const sig = token.slice(i + 1);
  if (!safeEqual(sign(body), sig)) return false;
  const exp = Number(body.split(":")[1]);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return true;
}

export function verifyPassword(input: string): boolean {
  const expected = password();
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Dummy compare so length leaks less timing info
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}

export async function isBlogAdmin(): Promise<boolean> {
  if (!isBlogAuthConfigured()) return false;
  const jar = await cookies();
  return verifySessionToken(jar.get(BLOG_SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
    secure: process.env.NODE_ENV === "production",
  };
}
