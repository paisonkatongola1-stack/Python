import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className, glass = true, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        glass && "glass-card",
        "p-6",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
