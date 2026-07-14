import { techByCategory } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const labels = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  libraries: "Libraries",
} as const;

function TechChip({ name, icon }: { name: string; icon?: string }) {
  return (
    <li>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2",
          "text-sm shadow-[var(--shadow-card)] transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40",
        )}
      >
        {icon ? (
          // simple-icons CDN — cached, no npm dep
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.simpleicons.org/${icon}`}
            alt=""
            width={16}
            height={16}
            className="size-4 opacity-90 dark:invert dark:opacity-80"
            loading="lazy"
          />
        ) : (
          <span className="size-1.5 rounded-full bg-primary/70" aria-hidden />
        )}
        {name}
      </span>
    </li>
  );
}

export function TechSection() {
  return (
    <Section
      id="tech"
      title="Tech stack"
      description="Tools I use to ship production systems."
    >
      <div className="space-y-8">
        {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
          <div key={key}>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {labels[key]}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {techByCategory[key].map((t) => (
                <TechChip key={t.name} name={t.name} icon={t.icon} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
