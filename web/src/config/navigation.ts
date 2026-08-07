export interface NavItem {
  id: string;
  href: string;
  label: string;
  /** Shown in sticky header */
  inHeader?: boolean;
  keywords?: string[];
}

/**
 * Order matches page section flow:
 * Hero → Experience → Projects → Tech → Education → GitHub → Connect → Contact
 */
export const navigation: NavItem[] = [
  {
    id: "hero",
    href: "/#hero",
    label: "Home",
    inHeader: true,
    keywords: ["top", "about", "intro"],
  },
  {
    id: "experience",
    href: "/#experience",
    label: "Experience",
    inHeader: true,
    keywords: ["work", "nokia", "job"],
  },
  {
    id: "projects",
    href: "/#projects",
    label: "Projects",
    inHeader: true,
    keywords: ["portfolio", "work", "code", "research"],
  },
  {
    id: "tech",
    href: "/#tech",
    label: "Tech stack",
    keywords: ["skills", "tools", "backend", "ai", "stack"],
  },
  {
    id: "education",
    href: "/#education",
    label: "Education",
    keywords: ["school", "degree", "mca", "bca"],
  },
  {
    id: "github",
    href: "/#github",
    label: "GitHub",
    keywords: ["activity", "repos", "contributions"],
  },
  {
    id: "social",
    href: "/#social",
    label: "Connect",
    keywords: ["social", "links", "github", "linkedin"],
  },
  {
    id: "contact",
    href: "/#contact",
    label: "Contact",
    inHeader: true,
    keywords: ["email", "hire", "message", "form"],
  },
  {
    id: "writing",
    href: "/writing",
    label: "Writing",
    inHeader: true,
    keywords: ["blog", "notes", "articles", "posts"],
  },
];

export const headerNav = navigation.filter((n) => n.inHeader);

/** Section ids observed by scrollspy (in-page only). */
export const scrollSectionIds = navigation
  .filter((n) => n.href.startsWith("/#"))
  .map((n) => n.id);
