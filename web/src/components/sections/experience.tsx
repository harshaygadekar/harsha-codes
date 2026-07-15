import { portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { Badge } from "@/components/ui/badge";

export function ExperienceSection() {
  const jobs = portfolio.experience;

  return (
    <Section
      id="experience"
      title="Experience"
      description="Production work with measurable impact."
    >
      <Reveal variant="stagger">
        <ol className="relative space-y-6">
          {/* Continuous vertical rail — independent of item count */}
          <span
            className="absolute top-2 bottom-2 left-[5px] w-px bg-border sm:left-[7px]"
            aria-hidden
          />

          {jobs.map((job) => (
            <RevealItem
              key={job.id}
              as="li"
              className="relative grid grid-cols-[12px_minmax(0,1fr)] gap-x-4 sm:grid-cols-[16px_minmax(0,1fr)] sm:gap-x-5"
            >
              {/* Dot centered on the rail */}
              <div className="relative z-[1] flex justify-center pt-6" aria-hidden>
                <span className="size-2.5 shrink-0 rounded-full border-2 border-primary bg-background ring-[3px] ring-background sm:size-3" />
              </div>

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
            </RevealItem>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-10" delay={0.06}>
        <h3 className="section-label mb-4">Education</h3>
        <Reveal
          variant="stagger-fast"
          as="ul"
          className="grid gap-3 sm:grid-cols-2"
        >
          {portfolio.education.map((ed) => (
            <RevealItem
              key={ed.id}
              as="li"
              className="surface-matte rounded-xl p-4 sm:p-5"
            >
              <p className="font-medium tracking-tight">{ed.school}</p>
              <p className="mt-1 text-sm text-muted-foreground">{ed.degree}</p>
              <p className="mt-2.5 font-mono text-xs text-muted-foreground">
                {ed.start} – {ed.end}
                {ed.cgpa ? ` · CGPA ${ed.cgpa}` : null}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </Reveal>
    </Section>
  );
}
