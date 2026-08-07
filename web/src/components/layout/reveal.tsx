"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  fadeScale,
  slideIn,
  stagger,
  staggerFast,
  staggerHero,
  motionProps,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealVariant =
  | "up"
  | "fade"
  | "scale"
  | "slide"
  | "stagger"
  | "stagger-fast"
  | "stagger-hero";

const variantsMap = {
  up: fadeUp,
  fade: fadeIn,
  scale: fadeScale,
  slide: slideIn,
  stagger,
  "stagger-fast": staggerFast,
  "stagger-hero": staggerHero,
} as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** Extra delay in seconds (ignored when reduced motion) */
  delay?: number;
  as?: "div" | "li" | "ul" | "article" | "section";
}

/**
 * Soft scroll/entrance reveal with blur. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const isStagger =
    variant === "stagger" ||
    variant === "stagger-fast" ||
    variant === "stagger-hero";
  const Comp =
    as === "ul"
      ? motion.ul
      : as === "li"
        ? motion.li
        : as === "article"
          ? motion.article
          : as === "section"
            ? motion.section
            : motion.div;

  return (
    <Comp
      className={cn(className)}
      variants={variantsMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={motionProps.viewport}
      {...(isStagger
        ? {}
        : {
            transition: {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1] as const,
              delay,
            },
          })}
    >
      {children}
    </Comp>
  );
}

/** Child item for stagger parents — must sit inside Reveal variant="stagger*" */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Comp =
    as === "li" ? motion.li : as === "article" ? motion.article : motion.div;

  return (
    <Comp className={cn(className)} variants={fadeUp}>
      {children}
    </Comp>
  );
}
