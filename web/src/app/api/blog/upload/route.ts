import { NextResponse } from "next/server";
import { isBlogAdmin } from "@/lib/blog/auth";
import { storeUpload } from "@/lib/blog/upload";
import { clientIp, rateLimit } from "@/lib/blog/rate-limit";

export async function POST(request: Request) {
  try {
    if (!(await isBlogAdmin())) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized. Sign in again at /writing/hrsh." },
        { status: 401 },
      );
    }

    const rl = await rateLimit(`upload:${clientIp(request)}`, 30, 60 * 15);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many uploads. Try again later." },
        { status: 429 },
      );
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid form data." },
        { status: 400 },
      );
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Missing file field." },
        { status: 400 },
      );
    }

    const result = await storeUpload(file);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      url: result.url,
      mime: result.mime,
      kind: result.kind,
    });
  } catch (err) {
    console.error("[api/blog/upload]", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error ? err.message : "Upload failed unexpectedly.",
      },
      { status: 500 },
    );
  }
}
