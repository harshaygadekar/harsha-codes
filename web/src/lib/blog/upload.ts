import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import sharp from "sharp";

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_VIDEO = 25 * 1024 * 1024;
/** Long-edge cap for blog images (Medium-like). */
const MAX_IMAGE_EDGE = 1600;

/** Magic-byte sniff for common image/video types. */
function sniffMime(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  )
    return "image/png";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return "image/gif";
  if (
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  )
    return "image/webp";
  if (buf.toString("ascii", 4, 8) === "ftyp") return "video/mp4";
  if (
    buf[0] === 0x1a &&
    buf[1] === 0x45 &&
    buf[2] === 0xdf &&
    buf[3] === 0xa3
  )
    return "video/webm";
  return null;
}

function extForMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/avif":
      return "avif";
    case "video/mp4":
      return "mp4";
    case "video/webm":
      return "webm";
    default:
      return "bin";
  }
}

/**
 * Resize / re-encode still images for web.
 * GIFs kept as-is (animation). Videos not processed.
 */
async function optimizeImage(
  buf: Buffer,
  mime: string,
): Promise<{ buffer: Buffer; mime: string; ext: string }> {
  if (mime === "image/gif") {
    return { buffer: buf, mime, ext: "gif" };
  }

  try {
    const image = sharp(buf, { failOn: "none" }).rotate();
    const meta = await image.metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const longEdge = Math.max(w, h);

    let pipeline = image;
    if (longEdge > MAX_IMAGE_EDGE) {
      if (w >= h) {
        pipeline = pipeline.resize({
          width: MAX_IMAGE_EDGE,
          withoutEnlargement: true,
        });
      } else {
        pipeline = pipeline.resize({
          height: MAX_IMAGE_EDGE,
          withoutEnlargement: true,
        });
      }
    }

    // Prefer WebP for photos; keep PNG when source is PNG (possible transparency)
    if (mime === "image/png" || meta.hasAlpha) {
      const out = await pipeline.png({ compressionLevel: 8 }).toBuffer();
      return { buffer: out, mime: "image/png", ext: "png" };
    }

    const out = await pipeline.webp({ quality: 82 }).toBuffer();
    return { buffer: out, mime: "image/webp", ext: "webp" };
  } catch {
    // Fallback: store original if sharp fails
    return { buffer: buf, mime, ext: extForMime(mime) };
  }
}

export type UploadResult =
  | { ok: true; url: string; mime: string; kind: "image" | "video" }
  | { ok: false; error: string };

export async function storeUpload(file: File): Promise<UploadResult> {
  const claimed = file.type || "application/octet-stream";
  let buf = Buffer.from(await file.arrayBuffer());
  const sniffed = sniffMime(buf);
  let mime = sniffed || claimed;

  const isImage = IMAGE_TYPES.has(mime);
  const isVideo = VIDEO_TYPES.has(mime);
  if (!isImage && !isVideo) {
    return {
      ok: false,
      error:
        "Only images (jpeg, png, webp, gif, avif) and video (mp4, webm) are allowed.",
    };
  }

  const max = isImage ? MAX_IMAGE : MAX_VIDEO;
  if (buf.length > max) {
    return {
      ok: false,
      error: isImage
        ? "Image too large (max 5MB)."
        : "Video too large (max 25MB).",
    };
  }

  if (sniffed && !IMAGE_TYPES.has(sniffed) && !VIDEO_TYPES.has(sniffed)) {
    return { ok: false, error: "File content does not match type." };
  }

  let ext = extForMime(mime);
  const kind = isImage ? "image" : "video";

  if (isImage) {
    const optimized = await optimizeImage(buf, mime);
    buf = Buffer.from(optimized.buffer);
    mime = optimized.mime;
    ext = optimized.ext;
  }

  const name = `blog/${randomUUID()}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(name, buf, {
        access: "public",
        contentType: mime,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return { ok: true, url: blob.url, mime, kind };
    } catch (err) {
      return {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "Blob upload failed. Check BLOB_READ_WRITE_TOKEN.",
      };
    }
  }

  if (process.env.NODE_ENV === "production") {
    return {
      ok: false,
      error:
        "File uploads require BLOB_READ_WRITE_TOKEN (Vercel Blob) in production.",
    };
  }

  try {
    const dir = path.join(process.cwd(), "public", "uploads", "blog");
    await fs.mkdir(dir, { recursive: true });
    const filename = `${randomUUID()}.${ext}`;
    await fs.writeFile(path.join(dir, filename), buf);
    return { ok: true, url: `/uploads/blog/${filename}`, mime, kind };
  } catch {
    return { ok: false, error: "Could not write upload to local disk." };
  }
}
