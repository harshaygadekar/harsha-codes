import { describe, expect, it } from "vitest";
import { contributionChartUrl, rankRepos } from "./github-rank";

const repo = (
  partial: Partial<{
    id: number;
    name: string;
    fork: boolean;
    stargazers_count: number;
    updated_at: string;
  }>,
) => ({
  id: partial.id ?? 1,
  name: partial.name ?? "repo",
  fork: partial.fork ?? false,
  stargazers_count: partial.stargazers_count ?? 0,
  updated_at: partial.updated_at ?? "2026-01-01T00:00:00Z",
});

describe("rankRepos", () => {
  it("excludes forks", () => {
    const ranked = rankRepos([
      repo({ id: 1, name: "forked", fork: true, stargazers_count: 99 }),
      repo({ id: 2, name: "mine", fork: false, stargazers_count: 1 }),
    ]);
    expect(ranked.map((r) => r.name)).toEqual(["mine"]);
  });

  it("orders by stars descending", () => {
    const ranked = rankRepos([
      repo({ id: 1, name: "low", stargazers_count: 1 }),
      repo({ id: 2, name: "high", stargazers_count: 5 }),
      repo({ id: 3, name: "mid", stargazers_count: 3 }),
    ]);
    expect(ranked.map((r) => r.name)).toEqual(["high", "mid", "low"]);
  });

  it("breaks star ties with more recent updated_at", () => {
    const ranked = rankRepos([
      repo({
        id: 1,
        name: "older",
        stargazers_count: 2,
        updated_at: "2025-01-01T00:00:00Z",
      }),
      repo({
        id: 2,
        name: "newer",
        stargazers_count: 2,
        updated_at: "2026-06-01T00:00:00Z",
      }),
    ]);
    expect(ranked.map((r) => r.name)).toEqual(["newer", "older"]);
  });

  it("respects limit", () => {
    const ranked = rankRepos(
      [
        repo({ id: 1, stargazers_count: 3 }),
        repo({ id: 2, stargazers_count: 2 }),
        repo({ id: 3, stargazers_count: 1 }),
      ],
      2,
    );
    expect(ranked).toHaveLength(2);
  });
});

describe("contributionChartUrl", () => {
  it("builds the public chart URL", () => {
    expect(contributionChartUrl("harshaygadekar")).toBe(
      "https://ghchart.rshah.org/111844/harshaygadekar",
    );
  });

  it("encodes username and color", () => {
    expect(contributionChartUrl("user/name", "abc def")).toBe(
      "https://ghchart.rshah.org/abc%20def/user%2Fname",
    );
  });
});
