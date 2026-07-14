import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "More",
  description:
    "Reading list, notes, and social feeds — coming in a future release.",
};

export default function MorePage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-wider text-primary">
        Version 2
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">More is cooking</h1>
      <p className="text-muted-foreground leading-relaxed">
        This space will hold Instagram, Threads, posts, a reading list, notes,
        and learning resources — without reshaping the main portfolio.
      </p>
      <Link href="/#hero" className={cn(buttonVariants({ size: "lg" }))}>
        Back home
      </Link>
    </div>
  );
}
