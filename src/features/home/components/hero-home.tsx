"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

import { Link } from "@/i18n/navigation";
import {
  fadeInFromLeft,
  fadeInFromRightScale,
  fadeInUp,
  IconCloudItem,
  SocialLinksItem,
  staggerContainer,
} from "@/shared";
import { AuroraText, Button } from "@/components";

export function HeroHome() {
  const t = useTranslations("home.hero");

  return (
    <section className="px-4 xl:px-0 py-12 flex items-center justify-center">
      <article className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 xl:gap-14">
        <motion.div
          className="flex flex-col justify-center gap-4 xl:gap-6 order-last md:order-first md:w-3/6 lg:w-4/7"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInFromLeft}>
            <header className="space-y-2 mb-4 md:mb-6">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold">
                {t("title")}
              </h1>

              <AuroraText className="text-3xl md:text-4xl xl:text-5xl font-bold">
                {t("subtitle")}
              </AuroraText>
            </header>

            <p>{t("description")}</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <SocialLinksItem />
            <footer className="flex flex-col gap-4 xl:gap-6 xs:flex-row w-full xs:w-fit">
              <Button
                asChild
                variant={"outline"}
                className="cursor-pointer shadow-sm px-12! xl:px-16! h-12 font-bold"
              >
                <Link href="/experience">{t("actionLabelPrimary")}</Link>
              </Button>
              <Button
                asChild
                className="btn-brand-cta h-12 w-full xs:w-fit xs:px-12 xl:px-16"
              >
                <Link href="/contact">{t("actionLabelSecondary")}</Link>
              </Button>
            </footer>
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-center w-full lg:w-1/2 min-h-87.5 md:min-h-100">
          <motion.div
            variants={fadeInFromRightScale}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full max-w-76 aspect-square flex items-center justify-center conversion-gradient rounded-full bg-linear-to-br from-primary/10 via-secondary/5 to-transparent shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.4),inset_10px_10px_25px_rgba(255,255,255,0.1)] dark:shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.5),inset_10px_10px_25px_rgba(255,255,255,0.15),0_0_40px_rgba(255,255,255,0.05)] border border-white/10 dark:border-white/20 bg-white/5 dark:bg-primary/5">
              <IconCloudItem />
            </div>
          </motion.div>
        </div>
      </article>
    </section>
  );
}
