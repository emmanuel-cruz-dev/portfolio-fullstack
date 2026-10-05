"use client";

import { motion } from "motion/react";

import { fadeIn } from "@/shared";

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-4 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.header>
  );
}
