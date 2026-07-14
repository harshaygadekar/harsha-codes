import { portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Experience"
      description="Production work with measurable impact."
    >
      <ol className="relative space-y-8 border-l border-border pl-6 md:pl-8">
        {portfolio.experience.map((job) => (
          <li key={job.id} className="relative">
            <span
              className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full border-2 border-primary bg-background md:-left-[2.15rem]"
              aria-hidden
            />
            <article className="surface-matte rounded-xl p-5 sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {job.company}
                  </h3>
                  <p className="text-sm text-primary">{job.role}</p>
                </div>
                <p className="shrink-0 font-mono text-xs text-muted-foreground sm:text-right">
                  {job.start} – {job.end}
                  <span className="mt-0.5 block">{job.location}</span>
                </p>
              </div>

              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.technologies.map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Education
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {portfolio.education.map((ed) => (
            <li key={ed.id} className="surface-matte rounded-xl p-4">
              <p className="font-medium tracking-tight">{ed.school}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{ed.degree}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
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
