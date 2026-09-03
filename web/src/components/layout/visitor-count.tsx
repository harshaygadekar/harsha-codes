"use client";

import { useEffect, useState } from "react";
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
      className="font-mono tabular-nums"
      aria-live="polite"
      title="Approximate unique visitors"
    >
      visitor #{display}
    </p>
  );
}
