import { portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const jobs = portfolio.experience;

  return (
    <Section
      id="experience"
      title="Experience"
      description="Production work with measurable impact."
    >
      {/*
        Two-column timeline: rail (dot + line) | card.
        Avoids absolute -left math that drifts across breakpoints.
      */}
      <ol className="space-y-6">
        {jobs.map((job, index) => {
          const isLast = index === jobs.length - 1;

          return (
            <li
              key={job.id}
              className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[1.25rem_minmax(0,1fr)] sm:gap-x-5"
            >
              {/* Timeline rail */}
              <div className="relative flex flex-col items-center" aria-hidden>
                <span className="mt-5 size-2.5 shrink-0 rounded-full border-2 border-primary bg-background sm:mt-6" />
                {!isLast ? (
                  <span className="mt-1 w-px flex-1 bg-border" />
                ) : (
                  // Keep column width consistent when no continuation line
                  <span className="mt-1 w-px flex-1 bg-transparent" />
                )}
              </div>

              {/* Content */}
              <article className="surface-matte min-w-0 rounded-xl p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                      {job.company}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-primary">
                      {job.role}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-xs leading-relaxed text-muted-foreground sm:text-right">
                    {job.start} – {job.end}
                    <span className="mt-0.5 block">{job.location}</span>
                  </p>
                </div>

                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-primary/80"
                        aria-hidden
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                  {job.technologies.map((t) => (
                    <Badge key={t} variant="secondary" className="font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="mt-10">
        <h3 className="section-label mb-4">Education</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {portfolio.education.map((ed) => (
            <li
              key={ed.id}
              className={cn("surface-matte rounded-xl p-4 sm:p-5")}
            >
              <p className="font-medium tracking-tight">{ed.school}</p>
              <p className="mt-1 text-sm text-muted-foreground">{ed.degree}</p>
              <p className="mt-2.5 font-mono text-xs text-muted-foreground">
                {ed.start} – {ed.end}
                {ed.cgpa ? ` · CGPA ${ed.cgpa}` : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
