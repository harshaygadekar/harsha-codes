"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { portfolio } from "@/content/portfolio";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/visitors", { method: "POST" });
        if (!res.ok) throw new Error("failed");
        const data = (await res.json()) as { count: number };
        if (!cancelled) setCount(data.count);
      } catch {
        if (!cancelled) setCount(portfolio.visitorSeed);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const display =
    count === null
      ? "·····"
      : count.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm"
      aria-live="polite"
      title="Approximate unique visitors"
    >
      <Eye className="size-3.5 text-primary/80" aria-hidden />
      <span>
        Visitor{" "}
        <span className="font-mono font-semibold tabular-nums text-foreground">
          #{display}
        </span>
      </span>
    </div>
  );
}
