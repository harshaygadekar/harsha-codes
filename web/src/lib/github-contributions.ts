export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function utcYmd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function parseYmd(iso: string): Date {
  const [y, m, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, day));
}

function levelFromCount(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/** Sunday-start rolling year, same window GitHub uses. */
export function windowForGraph(today = new Date()): { start: string; end: string } {
  const end = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const weekday = end.getUTCDay();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - weekday - 52 * 7);
  return { start: utcYmd(start), end: utcYmd(end) };
}

export function toWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function monthLabels(weeks: ContributionDay[][]): { week: number; label: string }[] {
  const labels: { week: number; label: string }[] = [];
  weeks.forEach((week, i) => {
    const startOfMonth = week.find((d) => parseYmd(d.date).getUTCDate() === 1);
    if (!startOfMonth) return;
    labels.push({
      week: i,
      label: MONTHS[parseYmd(startOfMonth.date).getUTCMonth()],
    });
  });
  return labels;
}

function fillWindow(
  byDate: Map<string, ContributionDay>,
  start: string,
  end: string,
): ContributionDay[] {
  const days: ContributionDay[] = [];
  const cursor = parseYmd(start);
  const last = parseYmd(end);
  while (cursor.getTime() <= last.getTime()) {
    const date = utcYmd(cursor);
    const existing = byDate.get(date);
    days.push(
      existing ?? {
        date,
        count: 0,
        level: 0,
      },
    );
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

async function fromGitHubGraphQL(
  username: string,
): Promise<ContributionDay[] | null> {
  if (!process.env.GITHUB_TOKEN) return null;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "harsha-codes-portfolio",
    },
    body: JSON.stringify({
      query: `query($login:String!){
        user(login:$login){
          contributionsCollection{
            contributionCalendar{
              weeks{
                contributionDays{
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`,
      variables: { login: username },
    }),
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(2500),
  });

  if (!res.ok) return null;
  const json = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            weeks: {
              contributionDays: { date: string; contributionCount: number }[];
            }[];
          };
        };
      };
    };
  };

  const weeks =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!weeks?.length) return null;

  return weeks.flatMap((week) =>
    week.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: levelFromCount(d.contributionCount),
    })),
  );
}

async function fromJogruber(username: string): Promise<ContributionDay[] | null> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
    {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(2500),
    },
  );
  if (!res.ok) return null;

  const json = (await res.json()) as {
    contributions?: { date: string; count: number; level: number }[];
  };
  if (!json.contributions?.length) return null;

  const { start, end } = windowForGraph();
  const byDate = new Map<string, ContributionDay>();
  for (const d of json.contributions) {
    if (d.date < start || d.date > end) continue;
    byDate.set(d.date, {
      date: d.date,
      count: d.count,
      level: Math.min(4, Math.max(0, d.level ?? levelFromCount(d.count))),
    });
  }
  return fillWindow(byDate, start, end);
}

export async function fetchContributionDays(
  username: string,
): Promise<ContributionDay[]> {
  try {
    const fromGitHub = await fromGitHubGraphQL(username);
    if (fromGitHub?.length) return fromGitHub;
  } catch {
    // fall through
  }

  try {
    const fromPublic = await fromJogruber(username);
    if (fromPublic?.length) return fromPublic;
  } catch {
    // empty graph
  }

  return [];
}
