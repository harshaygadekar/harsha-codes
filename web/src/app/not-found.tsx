import { InkLink } from "@/components/site/ink-link";

export default function NotFound() {
  return (
    <div className="site-frame page-enter pt-28 pb-8 sm:pt-32">
      <h1 className="font-display text-[2.35rem] font-normal leading-none tracking-[-0.03em]">
        404
      </h1>
      <p className="mt-4 text-[0.975rem] text-muted-foreground">
        nothing here.{" "}
        <InkLink href="/">go home</InkLink>
      </p>
    </div>
  );
}
