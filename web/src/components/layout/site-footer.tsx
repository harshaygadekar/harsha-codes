"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/content/portfolio";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { VisitorCount } from "@/components/layout/visitor-count";
import { ExternalLink } from "@/components/layout/external-link";

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="text-sm text-muted-foreground">
        <p>—</p>
        <p>—</p>
      </div>
    );
  }

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: portfolio.person.timezone,
  });

  const date = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: portfolio.person.timezone,
  });

  return (
    <div className="text-sm text-muted-foreground">
      <p className="tabular-nums">{time}</p>
      <p>{date}</p>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-0 pb-10 pt-4 md:pb-14">
      <div className="content-column">
        <div className="mb-10 border-t border-border/70" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <LiveClock />
            <VisitorCount />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">
              © {year} {portfolio.person.firstName}
            </span>
            <ExternalLink
              href={portfolio.links.github}
              className="link-quiet"
              showMark={false}
            >
              GitHub ↗
            </ExternalLink>
            <ExternalLink
              href={portfolio.links.linkedin}
              className="link-quiet"
              showMark={false}
            >
              LinkedIn ↗
            </ExternalLink>
            <ThemeToggle />
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/80">
          Built with care. Press{" "}
          <kbd className="rounded border border-border px-1 font-mono text-[10px]">
            ⌘K
          </kbd>{" "}
          to jump.
        </p>
      </div>
    </footer>
  );
}
