import { techByCategory } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { techIconUrl } from "@/lib/tech-icons";

const labels = {
  backend: "backend",
  ai: "ai",
  frontend: "frontend",
  infrastructure: "infrastructure",
  databases: "databases",
} as const;

function TechIcon({ slug, label }: { slug: string; label: string }) {
  const url = techIconUrl(slug);

  return (
    <span
      aria-hidden
      title={label}
      className="inline-block size-3.5 shrink-0 bg-foreground/70"
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
    <span className="soft-pill-btn">
      {icon ? (
        <TechIcon slug={icon} label={name} />
      ) : (
        <span
          className="size-1 shrink-0 rounded-full bg-muted-foreground/50"
          aria-hidden
        />
      )}
      <span>{name}</span>
    </span>
  );
}

export function TechSection() {
  return (
    <Section id="tech" title="tools i reach for">
      <div className="space-y-7">
        {(Object.keys(labels) as Array<keyof typeof labels>).map((key, i) => (
          <Reveal key={key} delay={i * 0.04}>
            <h3 className="mb-3 text-[12px] uppercase tracking-[0.08em] text-muted-foreground/80">
              {labels[key]}
            </h3>
            <Reveal
              variant="stagger-fast"
              as="ul"
              className="flex flex-wrap items-center gap-2"
            >
              {techByCategory[key].map((t) => (
                <RevealItem key={t.name} as="li" className="list-none">
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
