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
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "harsha-codes-portfolio",
        },
      },
    );

    if (!res.ok) return [];

    const data = (await res.json()) as GitHubRepo[];
    return rankRepos(data, limit);
  } catch {
    return [];
  }
}
