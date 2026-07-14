import { portfolio } from "@/content/portfolio";
import { ExternalLink } from "@/components/layout/external-link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {year} {portfolio.person.fullName}. Built with care.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <ExternalLink
            href={portfolio.links.github}
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </ExternalLink>
          <ExternalLink
            href={portfolio.links.linkedin}
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </ExternalLink>
          <a
            href={`mailto:${portfolio.person.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
