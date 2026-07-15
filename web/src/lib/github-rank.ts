export interface RankableRepo {
  id: number;
  name: string;
  fork: boolean;
  stargazers_count: number;
  updated_at: string;
}

/**
 * Prefer non-forks, higher stars, then more recent updates.
 */
export function rankRepos<T extends RankableRepo>(
  repos: T[],
  limit = 6,
): T[] {
  return [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    })
    .slice(0, limit);
}

export function contributionChartUrl(
  username: string,
  color = "111844",
): string {
  const safeUser = encodeURIComponent(username);
  const safeColor = encodeURIComponent(color);
  return `https://ghchart.rshah.org/${safeColor}/${safeUser}`;
}
