import { Download, Mail, MapPin } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { VisitorCount } from "@/components/layout/visitor-count";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { person, links } = portfolio;
  const initials = person.fullName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section id="hero" aria-labelledby="hero-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 md:pt-10">
        <div className="surface-matte overflow-hidden rounded-xl">
          <div
            className="relative h-28 w-full sm:h-36 md:h-44"
            style={{ background: "var(--banner-glow)" }}
            role="img"
            aria-label="Cover banner"
          >
            <div className="pixel-grid absolute inset-0 opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>

          <div className="relative px-4 pb-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div
                  className="-mt-12 flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border-4 border-card bg-accent pixel-grid sm:-mt-14 sm:size-28"
                  aria-hidden
                >
                  <span className="font-mono text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    {initials}
                  </span>
                </div>
                <div className="min-w-0 pb-1">
                  <h1
                    id="hero-heading"
                    className="text-2xl font-semibold tracking-tight sm:text-3xl"
                  >
                    {person.fullName}
                  </h1>
                  <p className="mt-0.5 text-sm text-muted-foreground sm:text-base">
                    {person.role}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0 opacity-70" aria-hidden />
                    {person.location}
                  </p>
                </div>
              </div>
              <div className="sm:pb-1">
                <VisitorCount />
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {person.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${person.email}`}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                <Mail className="size-4" aria-hidden />
                Contact me
              </a>
              <a
                href={links.resume}
                download
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Download className="size-4" aria-hidden />
                Resume
              </a>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
