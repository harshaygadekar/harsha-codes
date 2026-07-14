"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, motionProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={fadeUp}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
