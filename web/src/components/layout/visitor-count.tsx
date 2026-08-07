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
    <p
      className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground"
      aria-live="polite"
      title="Approximate unique visitors"
    >
      <Eye className="size-3.5 shrink-0 opacity-70" aria-hidden />
      <span>
        visitor{" "}
        <span className="font-mono tabular-nums text-foreground/80">
          #{display}
        </span>
      </span>
    </p>
  );
}
