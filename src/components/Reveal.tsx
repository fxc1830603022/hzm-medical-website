"use client";

import { motion, type MotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}> &
  MotionProps;

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: RevealProps) {
  const offsets = {
    up: { y: 28, x: 0 },
    left: { y: 0, x: 28 },
    right: { y: 0, x: -28 },
    none: { y: 0, x: 0 }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
