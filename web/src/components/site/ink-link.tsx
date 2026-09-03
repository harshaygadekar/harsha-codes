import Link from "next/link";
import { cn } from "@/lib/utils";

type InkLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function InkLink({ href, children, className, external }: InkLinkProps) {
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto:"));
  const classes = cn("ink-link", className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function InkLinkList({
  items,
}: {
  items: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <span>
      {items.map((item, i) => (
        <span key={item.href}>
          {i > 0 ? <span className="text-muted-foreground">, </span> : null}
          <InkLink href={item.href} external={item.external}>
            {item.label}
          </InkLink>
        </span>
      ))}
    </span>
  );
}
