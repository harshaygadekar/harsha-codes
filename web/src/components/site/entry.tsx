import { InkLink } from "@/components/site/ink-link";
import { cn } from "@/lib/utils";

export function EntryList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={cn("entry-list", className)}>{children}</ul>;
}

export function Entry({
  rail,
  title,
  href,
  meta,
  children,
}: {
  rail: string;
  title: string;
  href?: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="entry-row">
      <p className="entry-rail">{rail}</p>
      <div className="min-w-0">
        <h3 className="text-[1.05rem] leading-snug tracking-tight text-foreground sm:text-[1.1rem]">
          {href ? <InkLink href={href}>{title}</InkLink> : title}
          {meta ? <span className="tag-meta"> {meta}</span> : null}
        </h3>
        {children ? (
          <div className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {children}
          </div>
        ) : null}
      </div>
    </li>
  );
}
