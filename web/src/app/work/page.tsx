import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { Entry, EntryList } from "@/components/site/entry";
import { PageIntro, SectionLabel } from "@/components/site/page-intro";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  title: "Work",
  description: `Work and school — ${portfolio.person.fullName}.`,
  alternates: { canonical: `${siteUrl}/work` },
  openGraph: {
    title: `Work · ${portfolio.person.firstName.toLowerCase()}`,
    description: `Work and school — ${portfolio.person.fullName}.`,
    url: `${siteUrl}/work`,
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <div className="site-frame page-enter pt-28 pb-8 sm:pt-32 sm:pb-12">
      <PageIntro
        title="work"
        lede="jobs, a paper, and school."
      />

      <section aria-labelledby="experience-heading" className="mb-20 sm:mb-24">
        <SectionLabel>
          <span id="experience-heading">experience</span>
        </SectionLabel>
        <EntryList>
          {portfolio.experience.map((job) => (
            <Entry
              key={job.id}
              rail={job.start.slice(-4)}
              title={job.company}
            >
              <p>
                {job.role} · {job.location}
                <span className="text-muted-foreground/80">
                  {" "}
                  · {job.start} – {job.end}
                </span>
              </p>
              {job.highlights.map((h) => (
                <p key={h} className="mt-2">
                  {h}
                </p>
              ))}
            </Entry>
          ))}
        </EntryList>
      </section>

      <section
        id="research"
        aria-labelledby="research-heading"
        className="mb-20 scroll-mt-28 sm:mb-24"
      >
        <SectionLabel>
          <span id="research-heading">research</span>
        </SectionLabel>
        <EntryList>
          {portfolio.publications.map((pub) => (
            <Entry
              key={pub.id}
              rail={pub.date.slice(-4)}
              title={pub.title}
              href={pub.github ?? pub.paperUrl}
              meta={pub.venue.toLowerCase()}
            >
              {pub.note ? <p>{pub.note}</p> : null}
            </Entry>
          ))}
        </EntryList>
      </section>

      <section aria-labelledby="school-heading">
        <SectionLabel>
          <span id="school-heading">school</span>
        </SectionLabel>
        <EntryList>
          {portfolio.education.map((ed) => (
            <Entry
              key={ed.id}
              rail={ed.start.slice(-4)}
              title={ed.school}
              meta={ed.cgpa ? `[cgpa ${ed.cgpa}]` : undefined}
            >
              <p>
                {ed.degree} · {ed.location}
                <span className="text-muted-foreground/80">
                  {" "}
                  · {ed.start} – {ed.end}
                </span>
              </p>
            </Entry>
          ))}
        </EntryList>
      </section>
    </div>
  );
}
