"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/content/portfolio";
import type { ProjectItem } from "@/types/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { ExternalLink } from "@/components/layout/external-link";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.476 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12 24 5.37 18.627 0 12 0z" />
    </svg>
  );
}

/** Impact-style headline: title → metric (inspo list rows) */
function projectHeadline(project: ProjectItem): string {
  if (project.heroMetric) {
    return `${project.title} → ${project.heroMetric}`;
  }
  return project.title;
}

const projectIcons: Record<string, string> = {
  "ai-news-aggregator": "📡",
  raguard: "🛡️",
  verifyai: "🔍",
};

function ProjectRow({ project }: { project: ProjectItem }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const icon = projectIcons[project.id] ?? "◇";
  const headline = projectHeadline(project);
  const hasDetails =
    (project.highlights && project.highlights.length > 0) ||
    project.technologies.length > 0;

  return (
    <div className="-mx-3 rounded-lg px-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={hasDetails ? panelId : undefined}
        onClick={() => hasDetails && setOpen((v) => !v)}
        className={cn(
          "row-hover group/toggle w-full rounded-lg py-4 text-left outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring/50",
          hasDetails ? "cursor-pointer" : "cursor-default",
        )}
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 shrink-0 text-[15px]" aria-hidden>
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="min-w-0 flex-1 text-[15px] font-medium leading-snug tracking-tight text-foreground sm:text-base">
                {headline}
              </h3>
              {hasDetails ? (
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground/50 transition-transform duration-300 ease-out",
                    "group-hover/toggle:text-muted-foreground",
                    open && "rotate-180 text-muted-foreground",
                  )}
                  aria-hidden
                />
              ) : null}
            </div>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && hasDetails ? (
          <motion.div
            id={panelId}
            key="panel"
            role="region"
            aria-label={`${project.title} details`}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.32, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-7 sm:pl-8">
              {project.highlights && project.highlights.length > 0 ? (
                <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span
                        className="mt-[0.55em] size-1 shrink-0 rounded-full bg-muted-foreground/45"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {project.technologies.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 6).map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              {project.github ? (
                <div className="mt-4">
                  <ExternalLink
                    href={project.github}
                    showMark={false}
                    className="link-quiet inline-flex items-center gap-1.5 text-[13px]"
                  >
                    <GitHubIcon className="size-3.5 opacity-80" />
                    Open repository
                    <span aria-hidden>↗</span>
                  </ExternalLink>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ProjectsSection() {
  const projects = portfolio.projects;

  return (
    <Section id="projects" title="Handpicked Projects">
      <Reveal
        variant="stagger"
        as="ul"
        className="divide-y divide-border/70"
      >
        {projects.map((project) => (
          <RevealItem key={project.id} as="li">
            <ProjectRow project={project} />
          </RevealItem>
        ))}
      </Reveal>

      {portfolio.publications.length > 0 ? (
        <Reveal className="mt-12 md:mt-14" delay={0.05}>
          <h3 className="section-label mb-5">research</h3>
          <ul className="divide-y divide-border/70">
            {portfolio.publications.map((pub) => (
              <li key={pub.id}>
                <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-muted-foreground">
                      {pub.role} · {pub.venue}
                    </p>
                    <h4 className="mt-1 text-[15px] font-medium leading-snug tracking-tight text-foreground">
                      {pub.title}
                    </h4>
                    {pub.note ? (
                      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                        {pub.note}
                      </p>
                    ) : null}
                    <p className="mt-1.5 text-[13px] tabular-nums text-muted-foreground">
                      {pub.date}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-4 text-[13px]">
                    {pub.github ? (
                      <ExternalLink
                        href={pub.github}
                        className="link-quiet"
                        showMark={false}
                      >
                        code ↗
                      </ExternalLink>
                    ) : null}
                    {pub.paperUrl ? (
                      <ExternalLink
                        href={pub.paperUrl}
                        className="link-quiet"
                        showMark={false}
                      >
                        paper ↗
                      </ExternalLink>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </Section>
  );
}
