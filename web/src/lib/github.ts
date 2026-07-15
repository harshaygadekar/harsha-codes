import {
  contributionChartUrl,
  rankRepos,
  type RankableRepo,
} from "@/lib/github-rank";

export interface GitHubRepo extends RankableRepo {
  description: string | null;
  html_url: string;
  language: string | null;
}

export { contributionChartUrl };

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
