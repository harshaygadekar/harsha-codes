import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { TechSection } from "@/components/sections/tech";
import { EducationSection } from "@/components/sections/education";
import { GitHubSection } from "@/components/sections/github";
import { SocialSection } from "@/components/sections/social";
import { ContactSection } from "@/components/sections/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechSection />
      <EducationSection />
      <GitHubSection />
      <SocialSection />
      <ContactSection />
    </>
  );
}
