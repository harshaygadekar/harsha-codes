import { portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";

export function EducationSection() {
  return (
    <Section id="education" title="education">
      <Reveal>
        <ul className="divide-y divide-border/70">
          {portfolio.education.map((ed) => (
            <li
              key={ed.id}
              className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="text-[15px] font-medium tracking-tight text-foreground">
                  {ed.school}
                </p>
                <p className="mt-0.5 text-[14px] text-muted-foreground">
                  {ed.degree}
                </p>
              </div>
              <p className="shrink-0 text-[13px] tabular-nums text-muted-foreground sm:text-right">
                {ed.start} – {ed.end}
                {ed.location ? (
                  <span className="mt-0.5 block text-muted-foreground/80">
                    {ed.location}
                  </span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
