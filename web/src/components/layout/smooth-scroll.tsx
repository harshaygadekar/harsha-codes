"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

const SCROLL_OFFSET = -88;

/**
 * Global butter-smooth scroll via Lenis.
 * Respects prefers-reduced-motion (native scroll fallback).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduce) return;

    // Keep Lenis in sync with layout shifts (fonts, images)
    const onResize = () => lenisRef.current?.lenis?.resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [reduce]);

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: true,
        lerp: 0.075,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
        wheelMultiplier: 0.95,
        anchors: {
          offset: SCROLL_OFFSET,
          duration: 1.15,
        },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <AnchorScrollEnhancer />
      {children}
    </ReactLenis>
  );
}

/**
 * Intercept in-page hash links that Next/Link may not hand to Lenis anchors,
 * and expose a stable scroll helper for command palette / programmatic jumps.
 */
function AnchorScrollEnhancer() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      // Let download / modified clicks through
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      lenis?.scrollTo(el, {
        offset: SCROLL_OFFSET,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      history.replaceState(null, "", href);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [lenis]);

  return null;
}

/** Programmatic smooth scroll used by command palette / nav */
export function useSmoothScrollTo() {
  const lenis = useLenis();
  const reduce = useReducedMotion();

  return (target: string | HTMLElement, options?: { offset?: number }) => {
    const offset = options?.offset ?? SCROLL_OFFSET;
    const el =
      typeof target === "string" ? document.getElementById(target) : target;
    if (!el) return;

    if (reduce || !lenis) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return;
    }

    lenis.scrollTo(el, {
      offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };
}
