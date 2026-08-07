import { enabledSocial, portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";
import { ExternalLink } from "@/components/layout/external-link";

function displayHref(label: string, href: string): string {
  if (label.toLowerCase() === "email") {
    return href.replace(/^mailto:/, "");
  }
  if (label.toLowerCase() === "github") {
    return `@${portfolio.githubUsername}`;
  }
  if (label.toLowerCase() === "linkedin") {
    try {
      const path = new URL(href).pathname.replace(/\/$/, "");
      return path.replace(/^\//, "") || href;
    } catch {
      return href;
    }
  }
  return href;
}

export function SocialSection() {
  return (
    <Section id="social" title="elsewhere">
      <Reveal>
        <ul className="space-y-5">
          {enabledSocial.map((item) => (
            <li key={item.id}>
              <p className="text-[13px] text-muted-foreground">{item.label.toLowerCase()}</p>
              {item.id === "email" ? (
                <a
                  href={item.href}
                  className="mt-0.5 inline-flex items-center gap-2 text-[15px] text-foreground transition-opacity hover:opacity-70"
                >
                  {displayHref(item.label, item.href)}
                </a>
              ) : (
                <ExternalLink
                  href={item.href}
                  className="mt-0.5 inline-flex items-center gap-1.5 text-[15px] text-foreground transition-opacity hover:opacity-70"
                  showMark={false}
                >
                  {displayHref(item.label, item.href)}
                  <span className="text-muted-foreground/50" aria-hidden>
                    ↗
                  </span>
                </ExternalLink>
              )}
            </li>
          ))}
          <li>
            <p className="text-[13px] text-muted-foreground">resume</p>
            <a
              href={portfolio.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-flex items-center gap-1.5 text-[15px] text-foreground transition-opacity hover:opacity-70"
            >
              view resume
              <span className="text-muted-foreground/50" aria-hidden>
                ↗
              </span>
            </a>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
