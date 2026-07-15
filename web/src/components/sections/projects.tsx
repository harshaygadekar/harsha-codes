import { ArrowUpRight, FileText } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import type { ProjectItem } from "@/types/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { ExternalLink } from "@/components/layout/external-link";
import { cn } from "@/lib/utils";

function TechPills({ technologies }: { technologies: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {technologies.map((t) => (
        <li key={t}>
          <span className="inline-flex h-7 items-center rounded-md border border-border/80 bg-muted/40 px-2.5 font-mono text-[11px] text-muted-foreground">
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProjectActions({ project }: { project: ProjectItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          View on GitHub
          <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
        </a>
      ) : null}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Live demo
          <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
        </a>
      ) : null}
      {project.publication ? (
        <span className="inline-flex h-8 items-center gap-1.5 text-xs text-muted-foreground">
          <FileText className="size-3.5 shrink-0" aria-hidden />
          {project.publication}
        </span>
      ) : null}
    </div>
  );
}

function ProjectFooter({ project }: { project: ProjectItem }) {
  return (
    <div className="mt-auto pt-5">
      {/* Tech row — clear breathing room, no shared collision with actions */}
      <div className="pb-4">
        <TechPills technologies={project.technologies} />
      </div>
      {/* Actions sit under a clean hairline with fixed vertical rhythm */}
      <div className="border-t border-border pt-4">
        <ProjectActions project={project} />
      </div>
    </div>
  );
}

function FeaturedProject({ project }: { project: ProjectItem }) {
  return (
    <article className="surface-elevated-hover overflow-hidden rounded-2xl">
      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
              Featured
            </span>
            {project.heroMetric ? (
              <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
                {project.heroMetric}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <ProjectFooter project={project} />
        </div>

        <div className="flex flex-col border-t border-border bg-muted/25 p-6 sm:p-8 md:border-l md:border-t-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Highlights
          </p>
          <ul className="mt-4 space-y-3.5">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <span className="text-foreground/85">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  return (
    <article
      className={cn(
        "surface-elevated-hover flex flex-col rounded-2xl p-6 sm:p-7",
        "sm:flex-row sm:gap-8",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                {String(index).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {project.title}
              </h3>
            </div>
            {project.heroMetric ? (
              <p className="mt-1.5 font-mono text-[11px] text-primary">
                {project.heroMetric}
              </p>
            ) : null}
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {project.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex gap-2.5">
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-primary/80"
                aria-hidden
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ProjectFooter project={project} />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [featured, ...rest] = portfolio.projects;

  return (
    <Section
      id="projects"
      title="Projects"
      description="Recruiter-focused impact — not a feature dump."
      index="02"
    >
      <div className="space-y-4 sm:space-y-5">
        {featured ? (
          <Reveal>
            <FeaturedProject project={featured} />
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <Reveal variant="stagger" as="ul" className="grid gap-4 sm:gap-5">
            {rest.map((project, i) => (
              <RevealItem key={project.id} as="li">
                <ProjectRow project={project} index={i + 2} />
              </RevealItem>
            ))}
          </Reveal>
        ) : null}
      </div>

      {portfolio.publications.length > 0 ? (
        <Reveal className="mt-14" delay={0.05}>
          <h3 className="section-label mb-4">Research</h3>
          <ul className="space-y-3">
            {portfolio.publications.map((pub) => (
              <li
                key={pub.id}
                className="surface-elevated-hover flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:p-6"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs text-primary">
                    {pub.role} · {pub.venue}
                  </p>
                  <h4 className="mt-1.5 text-sm font-medium leading-snug tracking-tight sm:text-base">
                    {pub.title}
                  </h4>
                  <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                    {pub.date}
                  </p>
                  {pub.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pub.note}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 sm:pt-0.5">
                  {pub.github ? (
                    <ExternalLink
                      href={pub.github}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Code
                    </ExternalLink>
                  ) : null}
                  {pub.paperUrl ? (
                    <ExternalLink
                      href={pub.paperUrl}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Paper
                    </ExternalLink>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </Section>
  );
}
