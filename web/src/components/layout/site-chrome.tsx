"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolio } from "@/content/portfolio";

export function SiteChrome() {
  const pathname = usePathname();
  const isMinimal =
    pathname === "/" ||
    pathname === "/writing" ||
    pathname.startsWith("/writing/hrsh");

  // Homepage and Writings have their own clean top bar matching the requested reference layout
  if (isMinimal) {
    return null;
  }

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div className="site-frame flex h-16 items-center justify-between sm:h-[4.5rem]">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="chrome-link font-sans text-sm font-medium tracking-tight"
          >
            ← {portfolio.person.firstName.toLowerCase()}
          </Link>
        </div>

        <nav
          className="pointer-events-auto flex items-center gap-x-4 sm:gap-x-5"
          aria-label="Actions"
        >
          <Link href="/writing" className="chrome-link">
            writings
          </Link>
          <Link href="/contact" className="chrome-link">
            contact
          </Link>
          <a
            href={portfolio.links.resume}
            className="chrome-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            cv
          </a>
        </nav>
      </div>
    </header>
  );
}
