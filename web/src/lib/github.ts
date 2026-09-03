import {
  contributionChartUrl,
  isHiddenPortfolioPr,
  rankRepos,
  type RankableRepo,
} from "@/lib/github-rank";

export interface GitHubRepo extends RankableRepo {
  description: string | null;
  html_url: string;
  language: string | null;
}

export interface PullRequest {
  id: number | string;
  title: string;
  html_url: string;
  repo: string;
  number: number;
  state: "open" | "merged" | "closed" | string;
  created_at: string;
}

export const FALLBACK_RECENT_PRS: PullRequest[] = [
  {
    id: 10142,
    repo: "unslothai/unsloth",
    number: 10142,
    title: "Studio: require explicit HF token on Hub write paths for API-key callers (#10126)",
    html_url: "https://github.com/unslothai/unsloth/pull/10142",
    state: "open",
    created_at: "2026-09-01T10:29:16Z",
  },
  {
    id: 10084,
    repo: "unslothai/unsloth",
    number: 10084,
    title: "fix(studio): allow loopback CORS origins and custom origin overrides in desktop mode",
    html_url: "https://github.com/unslothai/unsloth/pull/10084",
    state: "open",
    created_at: "2026-08-31T17:23:23Z",
  },
  {
    id: 10237,
    repo: "can1357/oh-my-pi",
    number: 10237,
    title: "fix(lsp): evaluate idle timeout per workspace client (#8389)",
    html_url: "https://github.com/can1357/oh-my-pi/pull/10237",
    state: "open",
    created_at: "2026-08-30T02:32:02Z",
  },
];

export { contributionChartUrl, isHiddenPortfolioPr };

export async function fetchGitHubRepos(
  username: string,
  limit = 6,
): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "harsha-codes-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
      {
        next: { revalidate: 3600 },
        headers,
      },
    );

    if (!res.ok) return [];

    const data = (await res.json()) as GitHubRepo[];
    return rankRepos(data, limit);
  } catch {
    return [];
  }
}

// In-memory cache for PRs to prevent rate-limiting while providing dynamic freshness
let prCache: { data: PullRequest[]; timestamp: number } | null = null;
const PR_CACHE_TTL_MS = 60_000; // 60 seconds

export async function fetchRecentPullRequests(
  username: string = "harshaygadekar",
  limit = 3,
): Promise<PullRequest[]> {
  const now = Date.now();
  if (prCache && now - prCache.timestamp < PR_CACHE_TTL_MS && prCache.data.length >= limit) {
    return prCache.data.slice(0, limit);
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "harsha-codes-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(
        `author:${username} type:pr -repo:harshaygadekar/harsha-codes`,
      )}&sort=created&order=desc&per_page=20`,
      {
        next: { revalidate: 300 },
        headers,
        signal: AbortSignal.timeout(2500),
      },
    );

    if (!res.ok) {
      return prCache?.data ? prCache.data.slice(0, limit) : FALLBACK_RECENT_PRS.slice(0, limit);
    }

    const data = await res.json();
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return prCache?.data ? prCache.data.slice(0, limit) : FALLBACK_RECENT_PRS.slice(0, limit);
    }

    const prs: PullRequest[] = data.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => {
        const repoMatch = item.html_url?.match(
          /github\.com\/([^/]+\/[^/]+)\/pull\/(\d+)/,
        );
        const repo = repoMatch
          ? repoMatch[1]
          : (item.repository_url?.replace("https://api.github.com/repos/", "") ??
            "");
        const number = repoMatch ? parseInt(repoMatch[2], 10) : item.number;
        const isMerged = Boolean(item.pull_request?.merged_at);
        const state = isMerged ? "merged" : item.state;

        return {
          id: item.id,
          title: item.title,
          html_url: item.html_url,
          repo: repo,
          number: number,
          state: state,
          created_at: item.created_at,
        };
      })
      .filter((pr: PullRequest) => !isHiddenPortfolioPr(pr.repo));

    if (prs.length > 0) {
      prCache = { data: prs, timestamp: now };
      return prs.slice(0, limit);
    }

    return prCache?.data ? prCache.data.slice(0, limit) : FALLBACK_RECENT_PRS.slice(0, limit);
  } catch {
    return prCache?.data ? prCache.data.slice(0, limit) : FALLBACK_RECENT_PRS.slice(0, limit);
  }
}
