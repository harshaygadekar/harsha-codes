import { cn } from "@/lib/utils";
import { Reveal } from "@/components/layout/reveal";

interface SectionProps {
  id: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  /** Small eyebrow label above title (e.g. "01") */
  index?: string;
  /** Align heading block with centered content (e.g. contact form) */
  align?: "start" | "center";
}

/** Shared title scale — main sections + Education / Research */
export const sectionTitleClass =
  "text-[1.65rem] font-semibold tracking-tight text-balance sm:text-3xl md:text-[2rem] md:leading-tight";

export function Section({
  id,
  title,
  description,
  children,
  className,
  headingClassName,
  index,
  align = "start",
}: SectionProps) {
  const centered = align === "center";

  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn("scroll-mt-24 py-10 md:py-14", className)}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {title ? (
          <Reveal>
            <header
              className={cn(
                "mb-6 md:mb-8",
                centered && "mx-auto max-w-xl text-center",
                headingClassName,
              )}
            >
              {index ? (
                <p
                  className={cn(
                    "section-eyebrow",
                    centered && "justify-center before:hidden",
                  )}
                  aria-hidden
                >
                  {index}
                </p>
              ) : (
                <p
                  className={cn(
                    "section-eyebrow",
                    centered && "justify-center before:hidden",
                  )}
                  aria-hidden
                >
                  {title}
                </p>
              )}
              <h2 id={`${id}-heading`} className={sectionTitleClass}>
                {title}
              </h2>
              {description ? (
                <p
                  className={cn(
                    "mt-3 text-[15px] leading-relaxed text-muted-foreground",
                    centered ? "mx-auto max-w-xl" : "max-w-xl",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </header>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
