/**
 * Simple sliding-window rate limit via Upstash INCR + EXPIRE,
 * with in-memory fallback for local/dev.
 */

type Bucket = { count: number; resetAt: number };

const memory = new Map<string, Bucket>();

function hasRedis() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

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

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const redisKey = `blog:rl:${key}`;

  if (hasRedis()) {
    try {
      const count = Number(await redisCommand(["INCR", redisKey]));
      if (count === 1) {
        await redisCommand(["EXPIRE", redisKey, String(windowSeconds)]);
      }
      const ttl = Number(await redisCommand(["TTL", redisKey]));
      const resetAt =
        Date.now() + (ttl > 0 ? ttl * 1000 : windowSeconds * 1000);
      return {
        ok: count <= limit,
        remaining: Math.max(0, limit - count),
        resetAt,
      };
    } catch {
      // fall through to memory
    }
  }

  const now = Date.now();
  const bucket = memory.get(redisKey);
  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowSeconds * 1000;
    memory.set(redisKey, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  bucket.count += 1;
  memory.set(redisKey, bucket);
  return {
    ok: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

export function clientIp(request: Request): string {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
