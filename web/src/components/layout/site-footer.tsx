import { portfolio } from "@/content/portfolio";
import { VisitorCount } from "@/components/layout/visitor-count";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-0 pb-12 pt-8">
      <div className="site-frame flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[0.8rem] text-[#2563eb]">
        <p>
          © {year} {portfolio.person.firstName.toLowerCase()}
        </p>
        <VisitorCount />
      </div>
    </footer>
  );
}
