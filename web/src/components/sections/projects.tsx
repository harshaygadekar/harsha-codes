import { ArrowUpRight, Code2, FileText } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import type { ProjectItem } from "@/types/portfolio";
import { Section, sectionTitleClass } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { ExternalLink } from "@/components/layout/external-link";
import { cn } from "@/lib/utils";

/** Compact mono chips — fixed height, even padding */
function TechPills({
  technologies,
  max = 4,
}: {
  technologies: string[];
  max?: number;
}) {
  const shown = technologies.slice(0, max);
  const extra = technologies.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {shown.map((t) => (
        <li key={t}>
          <span className="inline-flex h-6 items-center rounded-md border border-border/70 bg-muted/30 px-2 font-mono text-[10px] leading-none text-muted-foreground">
            {t}
          </span>
        </li>
      ))}
      {extra > 0 ? (
        <li>
          <span className="inline-flex h-6 items-center rounded-md px-1.5 font-mono text-[10px] leading-none text-muted-foreground/80">
            +{extra}
          </span>
        </li>
      ) : null}
    </ul>
  );
}

function ProjectLinks({
  project,
  compact = false,
}: {
  project: ProjectItem;
  compact?: boolean;
}) {
  return (
    <div className="flex min-h-7 flex-wrap items-center gap-2">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-background/80 font-medium text-foreground transition-colors hover:bg-muted",
            compact ? "px-2.5 text-[11px]" : "px-3 text-xs",
          )}
        >
          <Code2 className="size-3.5 opacity-70" aria-hidden />
          {compact ? "Code" : "GitHub"}
          <ArrowUpRight className="size-3 opacity-50" aria-hidden />
        </a>
      ) : null}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Demo
          <ArrowUpRight className="size-3 opacity-50" aria-hidden />
        </a>
      ) : null}
      {project.publication ? (
        <span className="inline-flex h-7 max-w-full items-center gap-1 text-[11px] text-muted-foreground">
          <FileText className="size-3 shrink-0 opacity-70" aria-hidden />
          <span className="truncate">{project.publication}</span>
        </span>
      ) : null}
    </div>
  );
}

/**
 * Minimal bento mosaic (4 projects):
 *  ┌──────────┬─────┐
 *  │  hero    │  2  │
 *  │  (tall)  ├─────┤
 *  │          │  3  │
 *  ├──────────┴─────┤
 *  │      wide 4    │
 *  └────────────────┘
 */
function bentoCellClass(index: number): string {
  if (index === 0) return "sm:row-span-2";
  if (index === 3) return "sm:col-span-2";
  return "";
}

function BentoCard({
  project,
  index,
  tall,
  wide,
}: {
  project: ProjectItem;
  index: number;
  tall?: boolean;
  wide?: boolean;
}) {
  const techMax = tall ? 5 : wide ? 6 : 3;

  return (
    <article
      className={cn(
        "surface-elevated-hover flex h-full flex-col rounded-2xl p-5 sm:p-6",
        tall && "min-h-[300px] sm:min-h-full",
        wide && "min-h-[200px]",
        !tall && !wide && "min-h-[220px]",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
              {String(index).padStart(2, "0")}
            </span>
            {tall ? (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                Featured
              </span>
            ) : null}
          </div>
          <h3
            className={cn(
              "mt-2 font-semibold tracking-tight text-balance",
              tall ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
            )}
          >
            {project.title}
          </h3>
        </div>
        {project.heroMetric ? (
          <span
            className={cn(
              "shrink-0 rounded-lg border border-primary/15 bg-primary/8 px-2 py-1 text-left font-mono font-medium leading-snug text-primary",
              tall ? "text-[11px]" : "max-w-[8rem] text-[10px]",
            )}
          >
            {project.heroMetric}
          </span>
        ) : null}
      </header>

      <p
        className={cn(
          "mt-3 text-muted-foreground",
          tall
            ? "text-sm leading-relaxed sm:text-[15px] sm:leading-7"
            : "line-clamp-3 text-sm leading-relaxed",
        )}
      >
        {project.summary}
      </p>

      {tall ? (
        <ul className="mt-4 space-y-2">
          {project.highlights.slice(0, 2).map((h) => (
            <li
              key={h}
              className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-primary/80"
                aria-hidden
              />
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Footer — tech then links; fixed rhythm, no collisions */}
      <div className="mt-auto flex flex-col gap-3 pt-5">
        <TechPills technologies={project.technologies} max={techMax} />
        <div className="border-t border-border/80 pt-3">
          <ProjectLinks project={project} compact={!tall} />
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const projects = portfolio.projects;

  return (
    <Section
      id="projects"
      title="Projects"
      description="Recruiter-focused impact — not a feature dump."
    >
      <Reveal
        variant="stagger"
        as="ul"
        className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:gap-4"
      >
        {projects.map((project, i) => {
          const tall = i === 0;
          // Last tile full-width when even count (pairs the mosaic)
          const isWide = i === projects.length - 1 && projects.length >= 4;

          return (
            <RevealItem
              key={project.id}
              as="li"
              className={cn(bentoCellClass(i), "h-full")}
            >
              <BentoCard
                project={project}
                index={i + 1}
                tall={tall}
                wide={isWide}
              />
            </RevealItem>
          );
        })}
      </Reveal>

      {portfolio.publications.length > 0 ? (
        <Reveal className="mt-12 md:mt-14" delay={0.05}>
          <header className="mb-6 md:mb-8">
            <h3 className={sectionTitleClass}>Research</h3>
          </header>
          {/* Full-width cards — same content max width as bento grid above */}
          <ul className="grid grid-cols-1 gap-3">
            {portfolio.publications.map((pub) => (
              <li
                key={pub.id}
                className="surface-elevated-hover flex w-full flex-col rounded-2xl p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:p-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-primary">
                    {pub.role} · {pub.venue}
                  </p>
                  <h4 className="mt-1.5 text-base font-semibold leading-snug tracking-tight sm:text-lg">
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
                <div className="mt-4 flex shrink-0 flex-wrap items-center gap-3 border-t border-border/80 pt-3 sm:mt-0 sm:border-0 sm:pt-1">
                  {pub.github ? (
                    <ExternalLink
                      href={pub.github}
                      className="inline-flex h-7 items-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Code
                    </ExternalLink>
                  ) : null}
                  {pub.paperUrl ? (
                    <ExternalLink
                      href={pub.paperUrl}
                      className="inline-flex h-7 items-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
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
