import { NextResponse } from "next/server";
import { isBlogAdmin, isBlogAuthConfigured } from "@/lib/blog/auth";

export async function GET() {
  const configured = isBlogAuthConfigured();
  const admin = configured ? await isBlogAdmin() : false;
  return NextResponse.json({ ok: true, configured, admin });
}
