"use client";

import { motion } from "motion/react";

import { staggerItem } from "@/shared";
import { TechIcon } from "./tech-icon";
import type { Technology } from "../types";

export function TechBadge({ technology }: { technology: Technology }) {
  return (
    <motion.article
      variants={staggerItem}
      className="group flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2.5 select-none backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-[0_0_12px_rgba(0,212,255,0.3)] dark:hover:shadow-[0_0_12px_rgba(0,212,255,0.3)]"
    >
      <TechIcon name={technology.icon || ""} />

      <p className="text-sm font-medium text-muted-foreground/90 transition-colors duration-300 group-hover:text-foreground">
        {technology.name}
      </p>
    </motion.article>
  );
}
