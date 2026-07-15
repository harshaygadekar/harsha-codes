import { NextResponse } from "next/server";
import { portfolio } from "@/content/portfolio";
import { validateContact } from "@/lib/contact";

// Simple in-process rate limit (ponytail: enough for v1)
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
  };

  const validation = validateContact(parsed);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    );
  }

  if (validation.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = validation;

  // If RESEND_API_KEY is set, send real email. Otherwise log + accept.
  // Source: https://resend.com/docs/api-reference/emails/send-email
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const sendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO ?? portfolio.person.email],
          reply_to: email,
          subject: `Portfolio contact from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!sendRes.ok) {
        console.error("Resend error", await sendRes.text());
        return NextResponse.json(
          {
            ok: false,
            error: `Could not send. Email me at ${portfolio.person.email}`,
          },
          { status: 502 },
        );
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        {
          ok: false,
          error: `Could not send. Email me at ${portfolio.person.email}`,
        },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact]", { name, email, message: message.slice(0, 200) });
  }

  return NextResponse.json({ ok: true });
}
