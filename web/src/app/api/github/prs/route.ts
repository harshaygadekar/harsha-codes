import { NextResponse } from "next/server";
import { fetchRecentPullRequests } from "@/lib/github";
import { portfolio } from "@/content/portfolio";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prs = await fetchRecentPullRequests(portfolio.githubUsername, 3);
    return NextResponse.json(prs, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
