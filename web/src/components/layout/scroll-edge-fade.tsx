"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Fixed top/bottom gradient masks so content soft-fades at the viewport edges.
 * Opacity subtly tracks scroll position for a more alive feel.
 */
export function ScrollEdgeFade() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const topOpacity = useTransform(scrollYProgress, [0, 0.04, 1], [0.35, 1, 1]);
  const bottomOpacity = useTransform(
    scrollYProgress,
    [0, 0.92, 1],
    [1, 1, 0.25],
  );

  if (reduce) return null;

  return (
    <>
      <motion.div
        className="scroll-edge-fade scroll-edge-fade-top"
        style={{ opacity: topOpacity }}
        aria-hidden
      />
      <motion.div
        className="scroll-edge-fade scroll-edge-fade-bottom"
        style={{ opacity: bottomOpacity }}
        aria-hidden
      />
    </>
  );
}
