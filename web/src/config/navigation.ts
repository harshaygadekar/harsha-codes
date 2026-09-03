export interface NavItem {
  id: string;
  href: string;
  label: string;
  keywords?: string[];
}

/**
 * Site map for the command palette (⌘K).
 */
export const navigation: NavItem[] = [
  {
    id: "home",
    href: "/",
    label: "Home",
    keywords: ["top", "about", "index", "harsha"],
  },
  {
    id: "work",
    href: "/work",
    label: "Work",
    keywords: ["experience", "nokia", "job", "research", "school"],
  },
  {
    id: "projects",
    href: "/projects",
    label: "Projects",
    keywords: ["building", "code", "raguard", "verifyai"],
  },
  {
    id: "writing",
    href: "/writing",
    label: "Writing",
    keywords: ["blog", "notes", "articles", "posts"],
  },
  {
    id: "contact",
    href: "/contact",
    label: "Contact",
    keywords: ["email", "hire", "hello", "message", "form"],
  },
];

export const headerNav = navigation;

/** Kept so older scroll-spy imports don't break. Homepage is no longer a long-scroll page. */
export const scrollSectionIds: string[] = [];
