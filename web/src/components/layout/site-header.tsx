"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/content/portfolio";
import { headerNav } from "@/config/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useSmoothScrollTo } from "@/components/layout/smooth-scroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection();
  const reduce = useReducedMotion();
  const scrollTo = useSmoothScrollTo();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    if (href === "/writing" || href === "/more") return false;
    const id = href.replace("/#", "");
    return activeId === id;
  }

  function onNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (!href.startsWith("/#")) return;
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    const id = href.slice(2);
    scrollTo(id);
    history.replaceState(null, "", href);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out",
        scrolled
          ? "border-b border-border/40 bg-background/55 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="content-column flex h-14 items-center justify-between gap-4">
        <Link
          href="/#hero"
          onClick={(e) => onNavClick(e, "/#hero")}
          className="group rounded-md text-sm font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-px group-active:translate-y-px">
            {portfolio.brand}
          </span>
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
                onClick={(e) => onNavClick(e, item.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId={reduce ? undefined : "nav-active"}
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-foreground/50"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
          <div className="ml-1 pl-1">
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={reduce ? false : { opacity: 0, rotate: -60, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, rotate: 60, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-0.5 px-5 py-3">
              {headerNav.map((item, i) => {
                const active = linkActive(item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.28 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => onNavClick(e, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                        active
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
