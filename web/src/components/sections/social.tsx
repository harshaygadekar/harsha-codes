import type { ComponentType } from "react";
import { Code2, Briefcase, Mail, AtSign } from "lucide-react";
import { enabledSocial } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
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
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {enabledSocial.map((item, i) => {
          const Icon = icons[item.id];
          const featured = i === 0;

          return (
            <li
              key={item.id}
              className={cn(
                "surface-matte group rounded-xl transition-transform duration-200 hover:-translate-y-0.5",
                featured && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <ExternalLink
                href={item.href}
                showMark={false}
                className="flex h-full flex-col gap-4 p-5 focus-visible:rounded-xl"
                aria-label={`${item.label}${item.metric ? `, ${item.metric} ${item.metricLabel ?? ""}` : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <div>
                  <p className="font-medium tracking-tight">{item.label}</p>
                  {item.metric ? (
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      <span className="text-foreground">{item.metric}</span>
                      {item.metricLabel ? ` · ${item.metricLabel}` : null}
                    </p>
                  ) : null}
                </div>
              </ExternalLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
