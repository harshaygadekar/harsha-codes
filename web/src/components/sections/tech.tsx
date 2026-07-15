import { techByCategory } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { techIconUrl } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

const labels = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  libraries: "Libraries",
} as const;

function TechIcon({ slug, label }: { slug: string; label: string }) {
  const url = techIconUrl(slug);

  return (
    <span
      aria-hidden
      title={label}
      className="inline-block size-4 shrink-0 bg-foreground/80"
      style={{
        maskImage: `url(${url})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function TechChip({ name, icon }: { name: string; icon?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3.5 py-2",
        "text-sm text-foreground/90 shadow-[var(--shadow-card)]",
        "transition-[transform,border-color,background-color,box-shadow] duration-150",
        "hover:-translate-y-px hover:border-primary/30 hover:bg-muted/40 hover:shadow-[var(--shadow-card-hover)]",
      )}
    >
      {icon ? (
        <TechIcon slug={icon} label={name} />
      ) : (
        <span className="size-1.5 rounded-full bg-primary/70" aria-hidden />
      )}
      {name}
    </span>
  );
}

export function TechSection() {
  return (
    <Section
      id="tech"
      title="Tech stack"
      description="Tools I use to ship production systems."
    >
      <div className="space-y-7">
        {(Object.keys(labels) as Array<keyof typeof labels>).map((key, i) => (
          <Reveal key={key} delay={i * 0.04}>
            <h3 className="section-label mb-3">{labels[key]}</h3>
            <Reveal
              variant="stagger-fast"
              as="ul"
              className="flex flex-wrap gap-2"
            >
              {techByCategory[key].map((t) => (
                <RevealItem key={t.name} as="li">
                  <TechChip name={t.name} icon={t.icon} />
                </RevealItem>
              ))}
            </Reveal>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
