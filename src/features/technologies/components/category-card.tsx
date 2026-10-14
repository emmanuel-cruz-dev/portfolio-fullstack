"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { staggerContainer } from "@/shared";
import { cn } from "@/lib";
import { MagicCard } from "@/components";
import { TechBadge } from "./tech-badge";
import { Technology } from "../types";

interface CategoryCardProps {
  title: string;
  icon: ReactNode;
  technologies: Technology[];
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export function CategoryCard({
  title,
  icon,
  technologies,
  gradientFrom,
  gradientTo,
  className,
}: CategoryCardProps) {
  return (
    <MagicCard
      className={cn("rounded-2xl p-5", className)}
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}
    >
      <header className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      </header>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {technologies.map((tech) => (
          <TechBadge key={tech.id} technology={tech} />
        ))}
      </motion.div>
    </MagicCard>
  );
}
