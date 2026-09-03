import {
  monthLabels,
  toWeeks,
  type ContributionDay,
} from "@/lib/github-contributions";

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const TOP = 18;
const LEFT = 0;

const FILLS = [
  "#ebedf0",
  "#c7d7fb",
  "#7ea4f4",
  "#3b6fe8",
  "#2563eb",
] as const;

export function ContributionGraph({ days }: { days: ContributionDay[] }) {
  if (days.length === 0) {
    return (
      <p className="text-[13px] text-muted-foreground">
        contribution graph is taking a nap. check github.
      </p>
    );
  }

  const weeks = toWeeks(days);
  const labels = monthLabels(weeks);
  const width = LEFT + weeks.length * STEP - GAP;
  const height = TOP + 7 * STEP - GAP;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="min-w-[620px] w-full h-auto"
      role="img"
      aria-label="GitHub contribution graph for the last year"
    >
      {labels.map(({ week, label }) => (
        <text
          key={`${label}-${week}`}
          x={LEFT + week * STEP}
          y={11}
          fill="#6b7280"
          fontSize="9"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {label}
        </text>
      ))}
      {weeks.map((week, wi) =>
        week.map((day, di) => {
          const future = day.date > new Date().toISOString().slice(0, 10);
          const fill = future ? "transparent" : FILLS[day.level] ?? FILLS[0];
          return (
            <rect
              key={day.date}
              x={LEFT + wi * STEP}
              y={TOP + di * STEP}
              width={CELL}
              height={CELL}
              rx="2"
              fill={fill}
            >
              <title>
                {day.count} contribution{day.count === 1 ? "" : "s"} on {day.date}
              </title>
            </rect>
          );
        }),
      )}
    </svg>
  );
}
