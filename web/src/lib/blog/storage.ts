import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  normalizePost,
  normalizeTags,
  type BlogPost,
  type BlogPostInput,
} from "./types";
import { ensureUniqueSlug, slugify } from "./slug";
import { contentJsonToHtml, emptyDoc, excerptFromJson } from "./html";
import { sanitizeBlogHtml } from "./sanitize";

const INDEX_KEY = "blog:index";
const postKey = (slug: string) => `blog:post:${slug}`;

function contentDir() {
  return path.join(process.cwd(), "content", "blog");
}

function postPath(slug: string) {
  return path.join(contentDir(), `${slug}.json`);
}

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

async function ensureDir() {
  await fs.mkdir(contentDir(), { recursive: true });
}

function isPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== "object") return false;
  const p = value as BlogPost;
  return (
    typeof p.id === "string" &&
    typeof p.slug === "string" &&
    typeof p.title === "string" &&
    (p.status === "draft" || p.status === "published")
  );
}

function coercePost(value: unknown): BlogPost | null {
  if (!isPost(value)) return null;
  return normalizePost(value);
}

async function readFsPost(slug: string): Promise<BlogPost | null> {
  try {
    const raw = await fs.readFile(postPath(slug), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return coercePost(parsed);
  } catch {
    return null;
  }
}

async function listFsSlugs(): Promise<string[]> {
  try {
    await ensureDir();
    const files = await fs.readdir(contentDir());
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}

async function writeFsPost(post: BlogPost): Promise<void> {
  await ensureDir();
  await fs.writeFile(postPath(post.slug), JSON.stringify(post, null, 2), "utf8");
}

async function deleteFsPost(slug: string): Promise<void> {
  try {
    await fs.unlink(postPath(slug));
  } catch {
    // ignore missing
  }
}

async function listRedisSlugs(): Promise<string[]> {
  const result = await redisCommand(["GET", INDEX_KEY]);
  if (typeof result !== "string" || !result) return [];
  try {
    const parsed = JSON.parse(result) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((s): s is string => typeof s === "string")
      : [];
  } catch {
    return [];
  }
}

async function setRedisIndex(slugs: string[]) {
  await redisCommand(["SET", INDEX_KEY, JSON.stringify(slugs)]);
}

async function readRedisPost(slug: string): Promise<BlogPost | null> {
  const result = await redisCommand(["GET", postKey(slug)]);
  if (typeof result !== "string" || !result) return null;
  try {
    const parsed = JSON.parse(result) as unknown;
    return coercePost(parsed);
  } catch {
    return null;
  }
}

async function writeRedisPost(post: BlogPost) {
  await redisCommand(["SET", postKey(post.slug), JSON.stringify(post)]);
  const slugs = await listRedisSlugs();
  if (!slugs.includes(post.slug)) {
    slugs.push(post.slug);
    await setRedisIndex(slugs);
  }
}

async function deleteRedisPost(slug: string) {
  await redisCommand(["DEL", postKey(slug)]);
  const slugs = (await listRedisSlugs()).filter((s) => s !== slug);
  await setRedisIndex(slugs);
}

/** All posts (draft + published), newest first. */
export async function listPosts(): Promise<BlogPost[]> {
  let slugs: string[] = [];

  if (hasRedis()) {
    try {
      slugs = await listRedisSlugs();
    } catch {
      slugs = [];
    }
  }

  if (slugs.length === 0) {
    slugs = await listFsSlugs();
  }

  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    const post = await getPost(slug);
    if (post) posts.push(post);
  }

  return posts.sort((a, b) => {
    const da = a.publishedAt ?? a.updatedAt;
    const db = b.publishedAt ?? b.updatedAt;
    return db.localeCompare(da);
  });
}

export async function listPublishedPosts(): Promise<BlogPost[]> {
  return (await listPosts()).filter((p) => p.status === "published");
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (hasRedis()) {
    try {
      const fromRedis = await readRedisPost(slug);
      if (fromRedis) return fromRedis;
    } catch {
      // fall through
    }
  }
  return readFsPost(slug);
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const existing = (await listPosts()).map((p) => p.slug);
  const title = input.title.trim() || "Untitled";
  const slug = ensureUniqueSlug(input.slug?.trim() || title, existing);
  const now = new Date().toISOString();
  const contentJson = input.contentJson ?? emptyDoc();
  const contentHtml = sanitizeBlogHtml(
    input.contentHtml || contentJsonToHtml(contentJson),
  );
  const excerpt =
    input.excerpt?.trim() || excerptFromJson(contentJson) || "No excerpt yet.";

  const post: BlogPost = {
    id: randomUUID(),
    slug,
    title,
    excerpt,
    contentJson,
    contentHtml,
    status: input.status,
    tags: normalizeTags(input.tags),
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : null,
  };

  await persist(post);
  return post;
}

export async function updatePost(
  slug: string,
  input: Partial<BlogPostInput> & { newSlug?: string },
): Promise<BlogPost | null> {
  const current = await getPost(slug);
  if (!current) return null;

  const existing = (await listPosts())
    .map((p) => p.slug)
    .filter((s) => s !== slug);

  const title = input.title?.trim() ?? current.title;
  const nextSlug = ensureUniqueSlug(
    input.newSlug?.trim() || input.slug?.trim() || current.slug,
    existing,
    current.slug,
  );

  const contentJson = input.contentJson ?? current.contentJson;
  const contentHtml = sanitizeBlogHtml(
    input.contentHtml || contentJsonToHtml(contentJson),
  );
  const excerpt =
    input.excerpt?.trim() ||
    excerptFromJson(contentJson) ||
    current.excerpt;

  const status = input.status ?? current.status;
  const now = new Date().toISOString();

  let publishedAt = current.publishedAt;
  if (status === "published" && !publishedAt) publishedAt = now;
  if (status === "draft") publishedAt = current.publishedAt; // keep history

  const post: BlogPost = {
    ...normalizePost(current),
    slug: nextSlug,
    title,
    excerpt,
    contentJson,
    contentHtml,
    status,
    tags:
      input.tags !== undefined
        ? normalizeTags(input.tags)
        : normalizePost(current).tags,
    updatedAt: now,
    publishedAt,
  };

  if (nextSlug !== slug) {
    await remove(slug);
  }
  await persist(post);
  return post;
}

export async function deletePost(slug: string): Promise<boolean> {
  const existing = await getPost(slug);
  if (!existing) return false;
  await remove(slug);
  return true;
}

async function persist(post: BlogPost) {
  // Always write filesystem when possible (local + git-friendly).
  try {
    await writeFsPost(post);
  } catch {
    // Vercel read-only FS — rely on Redis
  }

  if (hasRedis()) {
    await writeRedisPost(post);
  }
}

async function remove(slug: string) {
  try {
    await deleteFsPost(slug);
  } catch {
    // ignore
  }
  if (hasRedis()) {
    await deleteRedisPost(slug);
  }
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 80;
}

export { slugify };
