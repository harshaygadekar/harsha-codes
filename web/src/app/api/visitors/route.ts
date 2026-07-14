import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { portfolio } from "@/content/portfolio";

// ponytail: in-memory counter (resets on cold start). Upgrade: Upstash Redis.
let memoryCount = portfolio.visitorSeed;

const COOKIE = "hc_vid";

export async function POST() {
  const jar = await cookies();
  const seen = jar.get(COOKIE);

  if (!seen) {
    memoryCount += 1;
  }

  const res = NextResponse.json({ count: memoryCount });

  if (!seen) {
    res.cookies.set(COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return res;
}

export async function GET() {
  return NextResponse.json({ count: memoryCount });
}
