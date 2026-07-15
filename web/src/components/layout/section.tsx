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
}

export function Section({
  id,
  title,
  description,
  children,
  className,
  headingClassName,
  index,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn("scroll-mt-24 py-14 md:py-20", className)}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {title ? (
          <Reveal>
            <header className={cn("mb-8 md:mb-10", headingClassName)}>
              {index ? (
                <p className="section-eyebrow" aria-hidden>
                  {index}
                </p>
              ) : (
                <p className="section-eyebrow" aria-hidden>
                  {title}
                </p>
              )}
              <h2
                id={`${id}-heading`}
                className="text-[1.65rem] font-semibold tracking-tight text-balance sm:text-3xl md:text-[2rem] md:leading-tight"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
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
