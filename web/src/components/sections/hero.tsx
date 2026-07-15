"use client";

import { Download, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { VisitorCount } from "@/components/layout/visitor-count";
import { Reveal } from "@/components/layout/reveal";
import { getInitials } from "@/lib/person";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { person, links } = portfolio;
  const initials = getInitials(person.fullName);

  return (
    <section id="hero" aria-labelledby="hero-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 md:pt-12">
        <Reveal variant="fade">
          <div className="gradient-border surface-matte relative overflow-hidden rounded-2xl">
            <div className="noise-overlay" />

            {/* Cover */}
            <div
              className="relative h-32 w-full sm:h-40 md:h-48"
              style={{ background: "var(--banner-glow)" }}
              role="img"
              aria-label="Cover banner"
            >
              <div className="pixel-grid absolute inset-0 opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              {/* Soft brand orb */}
              <div
                className="absolute -right-8 top-1/2 size-40 -translate-y-1/2 rounded-full opacity-40 blur-3xl sm:size-56"
                style={{ background: "var(--brand)" }}
                aria-hidden
              />
            </div>

            <div className="relative px-5 pb-8 sm:px-8 sm:pb-10 md:px-10">
              <Reveal delay={0.05}>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-6">
                    <div
                      className="-mt-14 flex size-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-card bg-[var(--brand)] pixel-grid shadow-lg sm:-mt-16 sm:size-28"
                      aria-hidden
                    >
                      <span className="font-mono text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0 pb-0.5">
                      <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 opacity-60" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Open to opportunities
                      </div>
                      <h1
                        id="hero-heading"
                        className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.5rem] md:leading-[1.15]"
                      >
                        {person.fullName}
                      </h1>
                      <p className="mt-1.5 text-[15px] font-medium text-primary sm:text-base">
                        {person.role}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin
                          className="size-3.5 shrink-0 opacity-70"
                          aria-hidden
                        />
                        {person.location}
                      </p>
                    </div>
                  </div>
                  <div className="sm:pb-1">
                    <VisitorCount />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {person.summary}
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${person.email}`}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-11 rounded-xl px-5 shadow-md",
                    )}
                  >
                    <Mail className="size-4" aria-hidden />
                    Contact me
                  </a>
                  <a
                    href={links.resume}
                    download
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-11 rounded-xl px-5",
                    )}
                  >
                    <Download className="size-4" aria-hidden />
                    Resume
                  </a>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "h-11 rounded-xl px-4 text-muted-foreground",
                    )}
                  >
                    GitHub
                    <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
