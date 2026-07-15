import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { portfolio } from "@/content/portfolio";

const COOKIE = "hc_vid";
const REDIS_KEY = "portfolio:visitors";

// Fallback when Upstash is unset (resets on cold start)
let memoryCount = portfolio.visitorSeed;

async function redisCommand(command: string[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

async function getCount(): Promise<number> {
  try {
    const result = await redisCommand(["GET", REDIS_KEY]);
    if (result === null || result === undefined) {
      // Upstash not configured
      if (!process.env.UPSTASH_REDIS_REST_URL) return memoryCount;
      return portfolio.visitorSeed;
    }
    const n = Number(result);
    return Number.isFinite(n) ? n : portfolio.visitorSeed;
  } catch {
    return memoryCount;
  }
}

async function incrementCount(): Promise<number> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      memoryCount += 1;
      return memoryCount;
    }
    const result = await redisCommand(["INCR", REDIS_KEY]);
    const n = Number(result);
    if (Number.isFinite(n)) {
      // Seed once if Redis started from 0 and we want a floor
      if (n === 1 && portfolio.visitorSeed > 1) {
        await redisCommand([
          "SET",
          REDIS_KEY,
          String(portfolio.visitorSeed + 1),
        ]);
        return portfolio.visitorSeed + 1;
      }
      return n;
    }
    memoryCount += 1;
    return memoryCount;
  } catch {
    memoryCount += 1;
    return memoryCount;
  }
}

export async function POST() {
  const jar = await cookies();
  const seen = jar.get(COOKIE);

  const count = seen ? await getCount() : await incrementCount();

  const res = NextResponse.json({ count });

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
  const count = await getCount();
  return NextResponse.json({ count });
}
