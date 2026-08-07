import { portfolio } from "@/content/portfolio";
import { contributionChartUrl } from "@/lib/github";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";
import { ExternalLink } from "@/components/layout/external-link";

export function GitHubSection() {
  const username = portfolio.githubUsername;
  const chartUrl = contributionChartUrl(username);

  return (
    <Section
      id="github"
      title="github activity"
      description={`contribution cadence · @${username}`}
    >
      <Reveal>
        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card p-4 sm:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chartUrl}
            alt={`GitHub contribution chart for ${username}`}
            className="mx-auto h-auto w-full max-w-2xl opacity-90 dark:opacity-95 dark:invert dark:hue-rotate-180 dark:brightness-[0.92] dark:contrast-[0.95]"
            loading="lazy"
            width={720}
            height={112}
          />
        </div>
      </Reveal>

      <Reveal className="mt-5" delay={0.04}>
        <ExternalLink
          href={`https://github.com/${username}`}
          className="inline-flex items-center gap-1.5 text-[13px] link-quiet"
          showMark={false}
        >
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          view all on github ↗
        </ExternalLink>
      </Reveal>
    </Section>
  );
}
