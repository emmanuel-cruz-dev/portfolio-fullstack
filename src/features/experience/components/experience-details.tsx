"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import {
  Building2,
  Calendar,
  ExternalLink,
  LinkIcon,
  Globe,
  Zap,
} from "lucide-react";

import { Button, MagicCard, Separator, GithubIcon } from "@/components";
import {
  BadgeList,
  LogoAvatar,
  TypeBadge,
  useEnumLabels,
  type Locale,
  staggerContainer,
  staggerItem,
} from "@/shared";
import { formatMonthYear } from "@/lib";
import { Experience } from "../types";

export function ExperienceDetails({ experience }: { experience: Experience }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("experience");
  const labels = useEnumLabels();

  const startDate = formatMonthYear(new Date(experience.start_date), locale);
  const endDate = experience.end_date
    ? formatMonthYear(new Date(experience.end_date), locale)
    : t("details.present");

  const hasLinks = Boolean(experience.demo_url || experience.github_url);

  return (
    <article className="max-w-6xl mx-auto py-10 md:py-14 px-4 xl:px-0">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.header
          variants={staggerItem}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <LogoAvatar
            src={experience.company_logo}
            alt={experience.company}
            Fallback={Building2}
          />
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type={experience.type} />
              <BadgeList
                items={experience.areas}
                variant="secondary"
                format={labels.area}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              {experience.project_name ?? experience.position}
            </h1>
            <p className="text-base font-medium text-muted-foreground">
              {experience.position}
              {experience.project_name && (
                <span className="text-muted-foreground/60">
                  {" "}
                  · {experience.company}
                </span>
              )}
              {!experience.project_name && (
                <span className="text-muted-foreground/60">
                  {" "}
                  · {experience.company}
                </span>
              )}
            </p>
          </div>
        </motion.header>

        <motion.div
          variants={staggerItem}
          className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-10 lg:gap-6 items-start"
        >
          <div className="md:col-span-3 lg:col-span-2 space-y-10">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                {t("details.about")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {experience.description}
              </p>
            </section>
          </div>

          <aside className="md:col-span-2 md:sticky md:top-8 lg:col-span-1 rounded-2xl">
            <MagicCard className="p-6 md:p-7">
              <div className="flex flex-col gap-4">
                {hasLinks && (
                  <>
                    <section className="space-y-3">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <LinkIcon className="h-4 w-4 text-brand-accent" />
                        {t("details.links")}
                      </h3>
                      <div className="flex flex-col gap-3">
                        {experience.company_url && (
                          <Button
                            asChild
                            variant="outline"
                            className="h-10 w-full gap-2"
                          >
                            <a
                              href={experience.company_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Globe className="h-4 w-4" />
                              {t("details.viewCompany")}
                            </a>
                          </Button>
                        )}
                        {experience.demo_url && (
                          <Button
                            asChild
                            variant="outline"
                            className="h-10 w-full gap-2"
                          >
                            <a
                              href={experience.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {t("details.liveDemo")}
                            </a>
                          </Button>
                        )}
                        {experience.github_url && (
                          <Button
                            asChild
                            className="btn-brand-cta h-10 w-full gap-2"
                          >
                            <a
                              href={experience.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GithubIcon className="h-4 w-4" />
                              {t("details.sourceCode")}
                            </a>
                          </Button>
                        )}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Zap className="h-4 w-4 text-brand-accent" />
                    {t("details.technologies")}
                  </h3>
                  <BadgeList
                    items={experience.technologies}
                    variant="outline"
                  />
                </section>

                <Separator />

                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Calendar className="h-4 w-4 text-brand-accent" />
                    {t("details.period")}
                  </h3>
                  <p className="text-sm text-foreground/80">
                    {startDate} — {endDate}
                  </p>
                </section>
              </div>
            </MagicCard>
          </aside>
        </motion.div>
      </motion.div>
    </article>
  );
}
