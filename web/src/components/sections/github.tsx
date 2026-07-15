import { Star } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import {
  contributionChartUrl,
  fetchGitHubRepos,
  type GitHubRepo,
} from "@/lib/github";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { ExternalLink } from "@/components/layout/external-link";

export async function GitHubSection() {
  const username = portfolio.githubUsername;
  const repos = await fetchGitHubRepos(username);
  const chartUrl = contributionChartUrl(username);

  return (
    <Section
      id="github"
      title="GitHub activity"
      description="Recent public work and contribution cadence."
      index="04"
    >
      <Reveal>
        <div className="surface-matte overflow-x-auto rounded-2xl p-5 sm:p-7">
          <p className="mb-3 text-xs text-muted-foreground">
            Contribution graph ·{" "}
            <ExternalLink
              href={`https://github.com/${username}`}
              className="hover:text-foreground"
            >
              @{username}
            </ExternalLink>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chartUrl}
            alt={`GitHub contribution chart for ${username}`}
            className="mx-auto h-auto w-full max-w-3xl opacity-90 dark:opacity-100"
            loading="lazy"
            width={720}
            height={112}
          />
        </div>
      </Reveal>

      {repos.length > 0 ? (
        <Reveal
          variant="stagger"
          as="ul"
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {repos.map((repo) => (
            <RevealItem key={repo.id} as="li">
              <RepoCard repo={repo} />
            </RevealItem>
          ))}
        </Reveal>
      ) : (
        <Reveal className="mt-6">
          <p className="text-sm text-muted-foreground">
            Live repo list unavailable right now.{" "}
            <ExternalLink
              href={`https://github.com/${username}`}
              className="text-foreground hover:underline"
            >
              Browse on GitHub
            </ExternalLink>
            .
          </p>
        </Reveal>
      )}
    </Section>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <div className="surface-interactive h-full rounded-2xl">
      <ExternalLink
        href={repo.html_url}
        showMark={false}
        className="flex h-full flex-col gap-2.5 rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="flex items-start justify-between gap-2">
          <span className="font-medium tracking-tight text-foreground">
            {repo.name}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Star className="size-3" aria-hidden />
            {repo.stargazers_count}
          </span>
        </div>
        {repo.description ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {repo.description}
          </p>
        ) : null}
        {repo.language ? (
          <p className="mt-auto pt-1 font-mono text-xs text-muted-foreground">
            {repo.language}
          </p>
        ) : null}
      </ExternalLink>
    </div>
  );
}
