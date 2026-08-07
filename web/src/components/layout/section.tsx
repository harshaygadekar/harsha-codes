import { cn } from "@/lib/utils";
import { Reveal } from "@/components/layout/reveal";

interface SectionProps {
  id: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  /** Align heading block with centered content (e.g. contact form) */
  align?: "start" | "center";
  /** Softer muted label style (editorial inspo) vs larger title */
  tone?: "label" | "title";
}

/** Shared title scale — reserved for rare emphasis */
export const sectionTitleClass =
  "text-lg font-medium tracking-tight text-foreground sm:text-xl";

export function Section({
  id,
  title,
  description,
  children,
  className,
  headingClassName,
  align = "start",
  tone = "label",
}: SectionProps) {
  const centered = align === "center";

  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn("scroll-mt-28 py-10 md:py-14", className)}
    >
      <div className="content-column">
        {title ? (
          <Reveal>
            <header
              className={cn(
                "mb-6 md:mb-8",
                centered && "text-center",
                headingClassName,
              )}
            >
              <h2
                id={`${id}-heading`}
                className={cn(
                  tone === "label"
                    ? "section-label"
                    : sectionTitleClass,
                )}
              >
                {title}
              </h2>
              {description ? (
                <p
                  className={cn(
                    "mt-2 text-[15px] leading-relaxed text-muted-foreground",
                    centered && "mx-auto max-w-md",
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
