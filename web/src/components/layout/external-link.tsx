import { cn } from "@/lib/utils";

interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  showMark?: boolean;
}

export function ExternalLink({
  href,
  children,
  className,
  showMark = true,
  ...props
}: ExternalLinkProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={cn(showMark && isExternal && "external-mark", className)}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  );
}
