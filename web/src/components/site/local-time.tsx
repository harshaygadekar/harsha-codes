"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/content/portfolio";

export function LocalTime({ className }: { className?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      const time = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: portfolio.person.timezone,
      });
      setLabel(`${time} ist`);
    }
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!label) {
    return (
      <span className={className} aria-hidden>
        ··:·· ist
      </span>
    );
  }

  return (
    <time className={className} dateTime={label} suppressHydrationWarning>
      {label}
    </time>
  );
}
