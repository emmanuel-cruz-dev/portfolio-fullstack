"use client";

import { motion } from "motion/react";
import { fadeIn, fadeInUp } from "../constants";

export function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
}) {
  return (
    <header className="relative max-w-6xl mx-auto text-center mb-20">
      <motion.p
        className="inline-block px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-800 dark:text-cyan-300 text-[10px] font-bold mb-2 tracking-[0.2em] uppercase border border-cyan-100 dark:border-cyan-800/50"
        variants={fadeInUp}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        className="lg:w-11/12 text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight"
        variants={fadeInUp}
        custom={0.1}
        initial="hidden"
        animate="visible"
      >
        {title}{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-brand-accent to-cyan-400">
            {titleAccent}
          </span>
          <div className="absolute bottom-2 left-0 w-full h-2 bg-brand-accent/30 blur-sm" />
        </span>
      </motion.h2>

      <motion.p
        className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light"
        variants={fadeInUp}
        custom={0.2}
        initial="hidden"
        animate="visible"
      >
        {description}
      </motion.p>

      <motion.div
        className="flex justify-center mt-12"
        variants={fadeIn}
        custom={0.35}
        initial="hidden"
        animate="visible"
      >
        <div className="w-72 h-0.5 bg-linear-to-r from-transparent via-brand-accent/50 to-transparent" />
      </motion.div>
    </header>
  );
}
