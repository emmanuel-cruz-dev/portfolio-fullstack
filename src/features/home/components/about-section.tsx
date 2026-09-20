"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { FaRegFileAlt } from "react-icons/fa";

import {
  fadeIn,
  fadeInFromLeft,
  fadeInFromRight,
  useIsDarkTheme,
  StatusBadge,
} from "@/shared";
import { Button, MagicCard } from "@/components";

export function AboutSection() {
  const t = useTranslations("home.aboutSection");
  const isDarkTheme = useIsDarkTheme();

  return (
    <section className="px-4 py-16 text-foreground md:py-20 xl:px-0">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <header className="space-y-4 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </header>
        </motion.div>

        <MagicCard
          className="rounded-2xl p-8 md:p-12 md:py-10"
          gradientColor={isDarkTheme ? "#262626" : "#e0e0e0"}
          gradientFrom="#00d4ff"
          gradientTo="#9E7AFF"
        >
          {/* Glows */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center"
          >
            {/* Left Column */}
            <motion.div
              variants={fadeInFromLeft}
              className="flex flex-col items-center lg:items-start gap-10 lg:col-span-4 xl:col-span-3"
            >
              <div className="relative w-full max-w-52 sm:max-w-64">
                <div className="absolute -inset-1 rounded-2xl bg-brand-accent/20 blur-xl dark:bg-brand-accent/30 transition duration-500" />

                <div className="group relative aspect-4/5 overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/about-profile.webp"
                    alt="Emmanuel Cruz - Profile Image"
                    fill
                    sizes="(max-width: 1024px) 384px, 400px"
                    className="object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                    priority
                  />
                </div>

                <div className="absolute -bottom-6 -right-6">
                  <StatusBadge />
                </div>
              </div>

              <Button
                asChild
                className="btn-brand-cta hidden lg:flex h-12 max-w-64"
              >
                <a
                  href="/CV - Emmanuel Cruz (fullstack).pdf"
                  aria-label={t("aboutCard.downloadCv")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("aboutCard.downloadCv")}
                  <FaRegFileAlt className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={fadeInFromRight}
              className="flex flex-col gap-4 md:gap-6 lg:col-span-8 xl:col-span-9"
            >
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {t("aboutCard.heading")}
              </h3>

              <div className="h-px bg-border/80" />

              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p className="font-medium text-foreground/90">
                  {t.rich("aboutCard.bio1", {
                    strong: (chunks) => (
                      <strong className="font-bold text-foreground">
                        {chunks}
                      </strong>
                    ),
                  })}
                </p>
                <p className="hidden sm:block">
                  {t.rich("aboutCard.bio2", {
                    strong: (chunks) => (
                      <strong className="font-bold text-foreground">
                        {chunks}
                      </strong>
                    ),
                    accent: (chunks) => (
                      <span className="text-brand-accent font-semibold">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    {t("aboutCard.stackTitle")}
                  </span>{" "}
                  <span>{t("aboutCard.stackItems")}</span>
                </p>
              </div>

              <footer className="mt-2">
                <dl>
                  <div className="flex flex-col gap-2 py-4 border-t border-border/80 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-cyan-800 dark:text-cyan-300">
                      {t("aboutCard.locationLabel")}
                    </dt>
                    <dd className="text-sm font-medium text-foreground/90">
                      {t("aboutCard.locationValue")}
                    </dd>
                  </div>

                  <div className="h-px bg-border/80" />

                  <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-cyan-800 dark:text-cyan-300">
                      {t("aboutCard.languagesLabel")}
                    </dt>
                    <dd className="text-sm font-medium text-foreground/90">
                      {t("aboutCard.languagesValue")}
                    </dd>
                  </div>
                </dl>
              </footer>
            </motion.div>
          </motion.div>
        </MagicCard>
      </div>
    </section>
  );
}
