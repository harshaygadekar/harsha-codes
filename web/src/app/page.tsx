import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "@/content/portfolio";
import { FALLBACK_RECENT_PRS } from "@/lib/github";
import { fetchContributionDays } from "@/lib/github-contributions";
import { RecentPullRequests } from "@/components/site/recent-prs";
import { ContributionGraph } from "@/components/site/contribution-graph";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

function repoLabel(github?: string, title?: string) {
  if (github) {
    const match = github.match(/github\.com\/[^/]+\/([^/?#]+)/i);
    if (match?.[1]) return match[1].toLowerCase();
  }
  return (title ?? "").toLowerCase();
}

function yearRange(start: string, end: string) {
  const a = start.slice(-4);
  const b = end.slice(-4);
  return a === b ? a : `${a}–${b}`;
}

export default async function HomePage() {
  const { person, links, experience, projects, publications } = portfolio;
  const contributionDays = await fetchContributionDays(
    portfolio.githubUsername,
  );

  return (
    <div className="site-frame pt-12 pb-16 sm:pt-20 sm:pb-24">
      <header className="flex items-baseline justify-between mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans lowercase">
          {person.fullName.toLowerCase()}
        </h1>
        <Link href="/writing" className="blue-link text-sm sm:text-base font-sans">
          writings
        </Link>
      </header>

      <div className="flex flex-wrap items-center gap-x-2 text-[13.5px] sm:text-sm text-muted-foreground mb-4">
        <a href={`mailto:${person.email}`} className="blue-link">
          {person.email}
        </a>
        <span className="text-muted-foreground/60 select-none">|</span>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="blue-link"
        >
          linkedin
        </a>
        <span className="text-muted-foreground/60 select-none">|</span>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="blue-link"
        >
          github
        </a>
        {links.x ? (
          <>
            <span className="text-muted-foreground/60 select-none">|</span>
            <a
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="blue-link"
            >
              x
            </a>
          </>
        ) : null}
      </div>

      <div className="text-[14.5px] sm:text-[15px] text-foreground/90 leading-relaxed mb-9 space-y-1">
        {person.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <section className="mb-9">
        <h2 className="text-base font-bold text-foreground mb-2.5 tracking-tight lowercase">
          experience
        </h2>
        <ul className="space-y-3 text-[14px] sm:text-[14.5px] leading-relaxed text-foreground/90">
          {experience.map((job) => (
            <li key={job.id}>
              <p>
                {job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blue-link font-medium"
                  >
                    {job.company.toLowerCase()}
                  </a>
                ) : (
                  <span className="font-medium">{job.company.toLowerCase()}</span>
                )}{" "}
                ({yearRange(job.start, job.end)}) — {job.role.toLowerCase()}
              </p>
              {job.highlights.map((h) => (
                <p key={h} className="mt-1">
                  {h}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-9">
        <h2 className="text-base font-bold text-foreground mb-2.5 tracking-tight lowercase">
          projects
        </h2>
        <ul className="space-y-3 text-[14px] sm:text-[14.5px] leading-relaxed text-foreground/90">
          {projects
            .filter((project) => project.id !== "chat-docs")
            .map((project) => {
              const label = repoLabel(project.github, project.title);
              return (
                <li key={project.id}>
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blue-link font-medium"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="font-medium">{label}</span>
                  )}{" "}
                  — {project.summary}
                </li>
              );
            })}
        </ul>
      </section>

      <section className="mb-9">
        <h2 className="text-base font-bold text-foreground mb-2.5 tracking-tight lowercase">
          research
        </h2>
        <ul className="space-y-3 text-[14px] sm:text-[14.5px] leading-relaxed text-foreground/90">
          {publications.map((pub) => {
            const title = pub.title.toLowerCase();
            return (
              <li key={pub.id}>
                {pub.github ? (
                  <a
                    href={pub.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blue-link font-medium"
                  >
                    {title}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{title}</span>
                )}{" "}
                ({pub.venue}) — {pub.role}. {pub.note}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-9">
        <div className="flex items-baseline justify-between mb-2.5">
          <h2 className="text-base font-bold text-foreground tracking-tight lowercase">
            open source
          </h2>
          <a
            href={`https://github.com/${portfolio.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="blue-link text-xs sm:text-[13px]"
          >
            @{portfolio.githubUsername} on github ↗
          </a>
        </div>
        <div className="chart-scroll rounded-lg border border-border/80 bg-card p-3 sm:p-4">
          <ContributionGraph days={contributionDays} />
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-base font-bold text-foreground mb-2.5 tracking-tight lowercase">
          recent pull requests
        </h2>
        <RecentPullRequests initialPrs={FALLBACK_RECENT_PRS.slice(0, 3)} />
      </section>
    </div>
  );
}
