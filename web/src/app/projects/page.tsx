import type { Metadata } from "next";
import {
  labProjects,
  portfolio,
  shippedProjects,
} from "@/content/portfolio";
import { Entry, EntryList } from "@/components/site/entry";
import { PageIntro, SectionLabel } from "@/components/site/page-intro";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  title: "Projects",
  description: `Things ${portfolio.person.firstName} built.`,
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: `Projects · ${portfolio.person.firstName.toLowerCase()}`,
    description: `Things ${portfolio.person.firstName} built.`,
    url: `${siteUrl}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="site-frame page-enter pt-28 pb-8 sm:pt-32 sm:pb-12">
      <PageIntro
        title="projects"
        lede="stuff i actually shipped."
      />

      <section aria-labelledby="shipped-heading" className="mb-20 sm:mb-24">
        <SectionLabel>
          <span id="shipped-heading">shipped</span>
        </SectionLabel>
        <EntryList>
          {shippedProjects.map((project) => (
            <Entry
              key={project.id}
              rail={project.year ?? "—"}
              title={project.title}
              href={project.demo ?? project.github}
            >
              <p>{project.summary}</p>
            </Entry>
          ))}
        </EntryList>
      </section>

      {labProjects.length > 0 ? (
        <section aria-labelledby="lab-heading">
          <SectionLabel>
            <span id="lab-heading">lab</span>
          </SectionLabel>
          <EntryList>
            {labProjects.map((project) => (
              <Entry
                key={project.id}
                rail={project.year ?? "—"}
                title={project.title}
                href={project.demo ?? project.github}
              >
                <p>{project.summary}</p>
              </Entry>
            ))}
          </EntryList>
        </section>
      ) : null}
    </div>
  );
}
