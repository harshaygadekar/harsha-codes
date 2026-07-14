import { Code2, FileText } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { ExternalLink } from "@/components/layout/external-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Projects"
      description="Recruiter-focused impact — not a feature dump."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {portfolio.projects.map((project) => (
          <li key={project.id} className="surface-matte flex flex-col rounded-xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight">
                {project.title}
              </h3>
              {project.heroMetric ? (
                <span className="shrink-0 rounded-md bg-accent px-2 py-1 font-mono text-[10px] leading-tight text-accent-foreground sm:text-xs">
                  {project.heroMetric}
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>

            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <Badge key={t} variant="outline" className="font-normal">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  <Code2 className="size-3.5" aria-hidden />
                  GitHub
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  Live demo
                </a>
              ) : null}
              {project.publication ? (
                <span className="inline-flex items-center gap-1 self-center text-xs text-muted-foreground">
                  <FileText className="size-3.5" aria-hidden />
                  {project.publication}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Research
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {portfolio.publications.map((pub) => (
            <li key={pub.id} className="surface-matte rounded-xl p-5">
              <p className="font-mono text-xs text-primary">
                {pub.role} · {pub.venue}
              </p>
              <h4 className="mt-1.5 font-medium tracking-tight leading-snug">
                {pub.title}
              </h4>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {pub.date}
              </p>
              {pub.note ? (
                <p className="mt-2 text-sm text-muted-foreground">{pub.note}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {pub.github ? (
                  <ExternalLink
                    href={pub.github}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Code
                  </ExternalLink>
                ) : null}
                {pub.paperUrl ? (
                  <ExternalLink
                    href={pub.paperUrl}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Paper
                  </ExternalLink>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
