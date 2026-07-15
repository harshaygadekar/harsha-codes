"use client";

import { Download, Mail, MapPin } from "lucide-react";
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
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 md:pt-10">
        <Reveal variant="fade">
          <div className="surface-matte overflow-hidden rounded-xl">
            <div
              className="relative h-28 w-full sm:h-36 md:h-44"
              style={{ background: "var(--banner-glow)" }}
              role="img"
              aria-label="Cover banner"
            >
              <div className="pixel-grid absolute inset-0 opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
            </div>

            <div className="relative px-5 pb-8 sm:px-8 sm:pb-9">
              <Reveal delay={0.06}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
                    <div
                      className="-mt-12 flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border-[3px] border-card bg-muted pixel-grid sm:-mt-14 sm:size-28"
                      aria-hidden
                    >
                      <span className="font-mono text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0 pb-0.5">
                      <h1
                        id="hero-heading"
                        className="text-2xl font-semibold tracking-tight text-balance sm:text-[1.75rem] md:text-3xl"
                      >
                        {person.fullName}
                      </h1>
                      <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">
                        {person.role}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground/90">
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

              <Reveal delay={0.12}>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-7">
                  {person.summary}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <a
                    href={`mailto:${person.email}`}
                    className={cn(buttonVariants({ size: "lg" }), "px-3.5")}
                  >
                    <Mail className="size-4" aria-hidden />
                    Contact me
                  </a>
                  <a
                    href={links.resume}
                    download
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "px-3.5",
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
                      "px-3.5",
                    )}
                  >
                    GitHub
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
