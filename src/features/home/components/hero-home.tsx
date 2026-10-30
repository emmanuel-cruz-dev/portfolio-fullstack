"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";

import { Link } from "@/i18n/navigation";
import {
  fadeInFromLeft,
  fadeInFromRightScale,
  fadeInUp,
  SocialLinksItem,
  staggerContainer,
} from "@/shared";
import { AuroraText, Button } from "@/components";

export function HeroHome({ iconCloud }: { iconCloud: React.ReactNode }) {
  const t = useTranslations("home.hero");

  return (
    <section className="section-gradient-a flex items-center justify-center py-12 px-4 xl:px-0">
      <article className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 xs:gap-10 lg:gap-6 xl:gap-14">
        <motion.div
          className="flex flex-col justify-center gap-4 xl:gap-6 order-last lg:order-first xl:w-4/7"
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
            <div className="flex flex-col gap-4 xl:gap-6 xs:flex-row w-full xs:w-fit">
              <Button
                asChild
                className="btn-brand-cta h-12 w-full xs:w-fit xs:px-12 xl:px-16"
              >
                <Link href="/contact">{t("actionLabelPrimary")}</Link>
              </Button>
              <Button
                asChild
                variant={"outline"}
                className="cursor-pointer shadow-sm px-12! xl:px-16! h-12 font-bold"
              >
                <Link href="/experience">{t("actionLabelSecondary")}</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-center lg:justify-end lg:pr-17 w-full xl:w-1/3 min-h-87.5 lg:min-h-100">
          <motion.div
            variants={fadeInFromRightScale}
            initial="hidden"
            animate="visible"
            className="relative w-full max-w-64 xs:max-w-76 aspect-square flex items-center justify-center conversion-gradient rounded-full bg-linear-to-br from-primary/10 via-secondary/5 to-transparent shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.4),inset_10px_10px_25px_rgba(255,255,255,0.1)] dark:shadow-[inset_-10px_-10px_25px_rgba(0,0,0,0.5),inset_10px_10px_25px_rgba(255,255,255,0.15),0_0_40px_rgba(255,255,255,0.05)] border border-white/10 dark:border-white/20 bg-white/5 dark:bg-primary/5"
          >
            {iconCloud}
            <div className="absolute bottom-3 -right-1 xs:bottom-5 xs:right-3 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <Image
                src="/e-logo.avif"
                alt="Emmanuel Cruz Logo"
                width={36}
                height={36}
                className="object-contain dark:hidden"
                priority
              />

              <Image
                src="/e-logo-white.avif"
                alt="Emmanuel Cruz Logo"
                width={36}
                height={36}
                className="hidden object-contain dark:block"
                priority
              />
            </div>
            <div className="absolute bottom-[-61.65px] right-[-58.15px] xs:bottom-[-72.75px] xs:-right-17.25 -z-2 w-91.5 h-91.5 xs:w-108.75 xs:h-108.75 opacity-30 dark:opacity-40">
              <Image
                src="/images/smoke-ring.png"
                alt="Smoke ring"
                width={460}
                height={460}
                className="object-cover w-full h-full dark:invert"
                priority
              />
            </div>
          </motion.div>
        </div>
      </article>
    </section>
  );
}
