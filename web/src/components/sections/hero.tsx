"use client";

import { FileText } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { portfolio } from "@/content/portfolio";
import { Reveal } from "@/components/layout/reveal";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export function HeroSection() {
  const { person, links } = portfolio;
  const reduceMotion = useReducedMotion();
  const displayName = person.fullName.toLowerCase();
  const nameWords = displayName.split(/\s+/).filter(Boolean).map((text) => ({
    text,
  }));

  return (
    <section id="hero" aria-labelledby="hero-heading" className="scroll-mt-28">
      <div className="content-column pt-10 pb-4 md:pt-16 md:pb-6">
        <Reveal variant="fade">
          <div>
            {/* Full name for a11y / SEO; typewriter is visual only */}
            <h1
              id="hero-heading"
              className={
                reduceMotion
                  ? "text-[1.65rem] font-medium tracking-tight text-foreground sm:text-3xl"
                  : "sr-only"
              }
            >
              {displayName}
            </h1>
            {!reduceMotion ? (
              <div
                className="flex min-h-[1.2em] items-baseline text-[1.65rem] font-medium tracking-tight text-foreground sm:text-3xl"
                aria-hidden
              >
                <TypewriterEffect
                  words={nameWords}
                  className="text-[1.65rem] font-medium tracking-tight text-foreground sm:text-3xl"
                  cursorClassName="bg-foreground/50"
                />
              </div>
            ) : null}
            <p className="mt-1.5 max-w-md text-[15px] text-muted-foreground">
              {person.role}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 max-w-xl">
            <p className="text-[15px] leading-7 text-foreground/85 sm:text-base sm:leading-8">
              {person.summary}
            </p>
            <p className="mt-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {person.signature}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-5 flex flex-wrap items-center gap-1.5 text-[15px] leading-7 text-muted-foreground">
            <span>based in bengaluru, india</span>
            <img
              src="https://flagcdn.com/w40/in.png"
              width={18}
              height={12}
              alt=""
              aria-hidden
              className="inline-block h-3 w-[1.125rem] shrink-0 rounded-[1px] object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="sr-only">India</span>
            <span>.</span>
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <nav
            className="mt-8 flex flex-row flex-wrap items-center gap-2.5"
            aria-label="Quick links"
          >
            <a
              href={links.resume}
              className="soft-pill-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="!size-3" strokeWidth={1.75} aria-hidden />
              <span>view resume</span>
            </a>
            <a href="#contact" className="soft-pill-btn">
              <span>contact</span>
            </a>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
