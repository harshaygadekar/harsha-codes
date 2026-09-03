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
  href?: string;
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

export type ProjectGroup = "shipped" | "lab";

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  /** Optional impact bullets — prefer a strong summary when omitted */
  highlights?: string[];
  technologies: string[];
  /** Short bracket tags on list pages, e.g. python · security */
  tags?: string[];
  /** Calendar year the project shipped or was last active */
  year?: string;
  group?: ProjectGroup;
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
  /** Short description of what the paper contributes */
  note?: string;
  github?: string;
  paperUrl?: string;
}

export type TechCategory =
  | "backend"
  | "ai"
  | "frontend"
  | "infrastructure"
  | "databases";

export interface TechItem {
  name: string;
  category: TechCategory;
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
    /** Homepage bio lines */
    intro: string[];
    /** One-line current status for the homepage index */
    now: string;
    /** Homepage bio — shorter than summary */
    about: string;
    signature: string;
  };
  links: {
    resume: string;
    github: string;
    linkedin: string;
    x?: string;
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
