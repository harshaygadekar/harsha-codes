"use client";

import type { Variants, Transition } from "framer-motion";

/** Calm editorial easing — soft ease-out */
export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Slightly snappier for micro-interactions */
export const easeSnappy: Transition["ease"] = [0.32, 0.72, 0, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

export const staggerHero: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const motionProps = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-8% 0px -6% 0px" as const, amount: 0.15 },
};

/** Shared hover/tap for interactive rows & chips */
export const interactiveSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.6,
};
