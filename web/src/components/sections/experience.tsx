"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ExperienceRow({
  job,
}: {
  job: (typeof portfolio.experience)[number];
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const hasDetails = job.highlights.length > 0;

  return (
    <article>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={hasDetails ? panelId : undefined}
        onClick={() => hasDetails && setOpen((v) => !v)}
        className={cn(
          "row-hover group/toggle -mx-3 w-[calc(100%+1.5rem)] rounded-lg px-3 py-1 text-left outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring/50",
          hasDetails ? "cursor-pointer" : "cursor-default",
        )}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-medium tracking-tight text-foreground sm:text-base">
                {job.company}
              </h3>
              {hasDetails ? (
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground/50 transition-transform duration-300 ease-out",
                    "group-hover/toggle:text-muted-foreground",
                    open && "rotate-180 text-muted-foreground",
                  )}
                  aria-hidden
                />
              ) : null}
            </div>
            <p className="mt-0.5 text-[14px] text-muted-foreground">
              {job.role}
            </p>
          </div>
          <p className="shrink-0 text-[13px] tabular-nums text-muted-foreground sm:text-right">
            {job.start} – {job.end}
            <span className="mt-0.5 block text-muted-foreground/80">
              {job.location}
            </span>
          </p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && hasDetails ? (
          <motion.div
            id={panelId}
            key="panel"
            role="region"
            aria-label={`${job.company} details`}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.32, ease: easeOut }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-foreground/80 sm:text-[15px] sm:leading-7">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span
                    className="mt-[0.55em] size-1 shrink-0 rounded-full bg-muted-foreground/50"
                    aria-hidden
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {job.technologies.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.technologies.map((t) => (
                  <span key={t} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Tech chips stay visible when collapsed if no accordion — only when expanded above */}
      {!hasDetails && job.technologies.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.technologies.map((t) => (
            <span key={t} className="tech-chip">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function ExperienceSection() {
  const jobs = portfolio.experience;

  return (
    <Section id="experience" title="experience">
      <Reveal variant="stagger" as="ul" className="space-y-8">
        {jobs.map((job) => (
          <RevealItem key={job.id} as="li">
            <ExperienceRow job={job} />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
