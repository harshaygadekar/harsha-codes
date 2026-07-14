export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

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
    return data
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || 0)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function contributionChartUrl(username: string, color = "2F2FE4") {
  // Public third-party contribution chart image (no API key).
  // Source pattern: ghchart.rshah.org
  return `https://ghchart.rshah.org/${color}/${username}`;
}
