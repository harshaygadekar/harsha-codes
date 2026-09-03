"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-block min-w-[2.6em] text-right text-[0.8125rem] text-muted-foreground",
          className,
        )}
        aria-hidden
      >
        day
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "chrome-link min-w-[2.6em] text-right",
        className,
      )}
    >
      {isDark ? "day" : "night"}
    </button>
  );
}
