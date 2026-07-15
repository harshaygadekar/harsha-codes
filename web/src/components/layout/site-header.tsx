"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { headerNav } from "@/config/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function linkActive(href: string) {
    if (href === "/more") return false;
    const id = href.replace("/#", "");
    return activeId === id;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-15 sm:px-6">
        <Link
          href="/#hero"
          className="rounded-lg text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {portfolio.brand}
        </Link>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Primary"
        >
          {headerNav.map((item) => {
            const active = linkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-[13px] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  active
                    ? "bg-muted/80 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                {item.label}
                {active ? (
                  <span
                    className="absolute inset-x-3 -bottom-[calc(0.5rem+1px)] h-px bg-primary/70"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
          <div className="ml-2 border-l border-border/80 pl-2">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-0.5 md:hidden">
          <ThemeToggle />
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden",
          !open && "hidden",
        )}
        aria-label="Mobile"
        hidden={!open}
      >
        <ul className="flex flex-col gap-0.5">
          {headerNav.map((item) => {
            const active = linkActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                    active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
