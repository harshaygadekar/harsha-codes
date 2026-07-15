import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/layout/fade-in";

interface SectionProps {
  id: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
}

export function Section({
  id,
  title,
  description,
  children,
  className,
  headingClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn("scroll-mt-24 py-12 md:py-16", className)}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {title ? (
          <FadeIn>
            <header className={cn("mb-6 md:mb-8", headingClassName)}>
              <h2
                id={`${id}-heading`}
                className="text-2xl font-semibold tracking-tight md:text-3xl"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {description}
                </p>
              ) : null}
            </header>
          </FadeIn>
        ) : null}
        <FadeIn>{children}</FadeIn>
      </div>
    </section>
  );
}
