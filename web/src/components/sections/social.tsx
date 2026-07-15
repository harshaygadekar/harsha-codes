import type { ComponentType } from "react";
import { Code2, Briefcase, Mail, AtSign } from "lucide-react";
import { enabledSocial } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/layout/reveal";
import { ExternalLink } from "@/components/layout/external-link";
import type { SocialPlatform } from "@/types/portfolio";
import { cn } from "@/lib/utils";

// lucide dropped brand glyphs — use semantic icons
const icons: Record<SocialPlatform, ComponentType<{ className?: string }>> = {
  github: Code2,
  linkedin: Briefcase,
  email: Mail,
  twitter: AtSign,
  threads: AtSign,
  instagram: AtSign,
};

export function SocialSection() {
  return (
    <Section
      id="social"
      title="Connect"
      description="Find me where I ship code and talk shop."
      index="05"
    >
      <Reveal
        variant="stagger"
        as="ul"
        className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {enabledSocial.map((item, i) => {
          const Icon = icons[item.id];
          const featured = i === 0;

          return (
            <RevealItem
              key={item.id}
              as="li"
              className={cn(
                "surface-interactive group rounded-2xl",
                featured && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <ExternalLink
                href={item.href}
                showMark={false}
                className="flex h-full flex-col gap-5 rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
                aria-label={`${item.label}${item.metric ? `, ${item.metric} ${item.metricLabel ?? ""}` : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-primary ring-1 ring-border/50">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span
                    className="text-sm text-muted-foreground opacity-40 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                    aria-hidden
                  >
                    ↗
                  </span>
                </div>
                <div>
                  <p className="font-medium tracking-tight">{item.label}</p>
                  {item.metric ? (
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      <span className="text-foreground/90">{item.metric}</span>
                      {item.metricLabel ? ` · ${item.metricLabel}` : null}
                    </p>
                  ) : null}
                </div>
              </ExternalLink>
            </RevealItem>
          );
        })}
      </Reveal>
    </Section>
  );
}
