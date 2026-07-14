export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "threads"
  | "instagram"
  | "email";

export interface SocialLink {
  id: SocialPlatform;
  label: string;
  href: string;
  enabled: boolean;
  metric?: string;
  metricLabel?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  cgpa?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  heroMetric?: string;
  github?: string;
  demo?: string;
  publication?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  venue: string;
  date: string;
  role: string;
  note?: string;
  github?: string;
  paperUrl?: string;
}

export interface TechItem {
  name: string;
  category: "languages" | "frameworks" | "tools" | "libraries";
  /** Simple-icons slug when available */
  icon?: string;
}

export interface PortfolioContent {
  brand: string;
  person: {
    fullName: string;
    firstName: string;
    role: string;
    location: string;
    timezone: string;
    email: string;
    phone: string;
    summary: string;
    signature: string;
  };
  links: {
    resume: string;
    github: string;
    linkedin: string;
    website?: string;
  };
  social: SocialLink[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  publications: PublicationItem[];
  tech: TechItem[];
  githubUsername: string;
  visitorSeed: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
