import { HeroSection } from "@/components/sections/hero";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { TechSection } from "@/components/sections/tech";
import { GitHubSection } from "@/components/sections/github";
import { SocialSection } from "@/components/sections/social";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechSection />
      <GitHubSection />
      <SocialSection />
      <ContactSection />
    </>
  );
}
