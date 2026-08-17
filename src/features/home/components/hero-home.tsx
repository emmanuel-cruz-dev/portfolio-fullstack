"use client";

import { motion, Variants } from "motion/react";
import { useTranslations } from "next-intl";

import { IconCloudItem, SocialLinksItem } from "@/shared";
import { AuroraText, ShimmerButton } from "@/components";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const orbitVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2,
    },
  },
};

export function HeroHome() {
  const t = useTranslations("home.hero");

  return (
    <section className="py-6 flex items-center justify-center">
      <article className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 xl:gap-14">
        <motion.div
          className="flex flex-col justify-center gap-4 order-last md:order-first md:w-3/6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="w-fit">
            <ShimmerButton className="flex gap-2 scale-75 origin-left select-none cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              {t("available")}
            </ShimmerButton>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl xl:text-6xl font-bold"
          >
            {t("title")}
          </motion.h1>

          <motion.div variants={itemVariants}>
            <AuroraText className="text-3xl md:text-4xl xl:text-5xl font-bold">
              {t("subtitle")}
            </AuroraText>
          </motion.div>

          <motion.p variants={itemVariants}>{t("description")}</motion.p>

          <motion.div variants={itemVariants}>
            <SocialLinksItem />
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-center w-full lg:w-1/2 min-h-87.5 md:min-h-100">
          <motion.div
            variants={orbitVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full max-w-76 aspect-square flex items-center justify-center conversion-gradient rounded-full bg-linear-to-tr from-primary/5 to-secondary/5 shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.15),inset_10px_10px_25px_rgba(255,255,255,0.5)] dark:shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.6),inset_10px_10px_25px_rgba(255,255,255,0.05)] border border-white/10">
              <IconCloudItem />
            </div>
          </motion.div>
        </div>
      </article>
    </section>
  );
}
