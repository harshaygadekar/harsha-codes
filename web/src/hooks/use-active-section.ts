"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { scrollSectionIds } from "@/config/navigation";

function subscribePath(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

function getPath() {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}

/**
 * Tracks which page section is most visible for nav highlighting.
 */
export function useActiveSection(sectionIds: string[] = scrollSectionIds) {
  const pathname = useSyncExternalStore(subscribePath, getPath, () => "/");
  const [activeId, setActiveId] = useState<string | null>(
    sectionIds[0] ?? null,
  );

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const id of sectionIds) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }

        if (window.scrollY < 80) {
          setActiveId(sectionIds[0] ?? null);
          return;
        }

        if (bestId && bestRatio > 0) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: "-72px 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sectionIds, pathname]);

  if (pathname !== "/") return null;
  return activeId;
}
