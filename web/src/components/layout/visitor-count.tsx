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
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs text-muted-foreground shadow-sm"
      aria-live="polite"
      title="Approximate unique visitors this session tracks"
    >
      <Eye className="size-3.5 opacity-70" aria-hidden />
      <span>
        You are visitor{" "}
        <span className="font-mono font-medium text-foreground">#{display}</span>
      </span>
    </div>
  );
}
