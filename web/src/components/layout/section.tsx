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
      className={cn("scroll-mt-24 py-16 md:py-24", className)}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {title ? (
          <FadeIn>
            <header className={cn("mb-8 md:mb-10", headingClassName)}>
              <h2
                id={`${id}-heading`}
                className="text-2xl font-semibold tracking-tight md:text-3xl"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
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
