export interface NavItem {
  id: string;
  href: string;
  label: string;
  /** Shown in sticky header */
  inHeader?: boolean;
  keywords?: string[];
}

/** Single source for header, scrollspy, and command palette. */
export const navigation: NavItem[] = [
  {
    id: "hero",
    href: "/#hero",
    label: "Home",
    inHeader: true,
    keywords: ["top", "about", "intro"],
  },
  {
    id: "social",
    href: "/#social",
    label: "Connect",
    keywords: ["social", "links", "github", "linkedin"],
  },
  {
    id: "experience",
    href: "/#experience",
    label: "Experience",
    inHeader: true,
    keywords: ["work", "nokia", "job", "education"],
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
    keywords: ["skills", "tools", "languages"],
  },
  {
    id: "github",
    href: "/#github",
    label: "GitHub",
    keywords: ["activity", "repos", "contributions"],
  },
  {
    id: "contact",
    href: "/#contact",
    label: "Contact",
    inHeader: true,
    keywords: ["email", "hire", "message", "form"],
  },
  {
    id: "more",
    href: "/more",
    label: "More",
    inHeader: true,
    keywords: ["extra", "soon"],
  },
];

export const headerNav = navigation.filter((n) => n.inHeader);

/** Section ids observed by scrollspy (in-page only). */
export const scrollSectionIds = navigation
  .filter((n) => n.href.startsWith("/#"))
  .map((n) => n.id);
