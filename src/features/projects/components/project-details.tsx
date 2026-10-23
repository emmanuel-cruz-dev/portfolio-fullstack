"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import {
  ExternalLink,
  ListChecks,
  Calendar,
  ArrowLeft,
  Zap,
  Star,
  LinkIcon,
  Puzzle,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Badge, Button, MagicCard, Separator, GithubIcon } from "@/components";
import {
  StatusBadge,
  TypeBadge,
  BadgeList,
  useEnumLabels,
  type Locale,
  fadeIn,
  staggerContainer,
  staggerItem,
} from "@/shared";
import { formatMonthYear } from "@/lib/utils/date.utils";
import { Project } from "../types";

export function ProjectDetails({ project }: { project: Project }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");
  const labels = useEnumLabels();

  const startDate = formatMonthYear(new Date(project.start_date), locale);
  const endDate = project.end_date
    ? formatMonthYear(new Date(project.end_date), locale)
    : t("details.present");

  const mainImage = project.images[0];
  const sideImages = project.images.slice(1, 4);
  const hasSide = sideImages.length > 0;
  const hasLinks = Boolean(project.demo_url || project.github_url);

  return (
    <article className="max-w-6xl mx-auto py-10 md:py-14 px-4 xl:px-0">
      <motion.div
        variants={fadeIn}
        custom={0}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="group text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t("details.goToProjects")}
          </Link>
        </Button>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.header variants={staggerItem} className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <TypeBadge type={project.type} />
            <BadgeList
              items={project.areas}
              variant="secondary"
              format={labels.area}
            />
            <StatusBadge status={project.status} />
            {project.featured && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-sky-700 dark:text-brand-accent border-sky-700 dark:border-brand-accent/50"
              >
                <Star className="h-3 w-3 fill-current" />
                {t("details.featured")}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight lg:max-w-4xl">
            {project.title}
          </h1>
        </motion.header>

        <motion.section
          variants={staggerItem}
          aria-label={t("details.screenshots")}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch"
        >
          <div
            className={`relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted shadow-md ${
              hasSide ? "lg:col-span-2" : "lg:col-span-3"
            }`}
          >
            <Image
              src={mainImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes={
                hasSide
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1152px) 1152px, 100vw"
              }
              priority
            />
          </div>

          {hasSide && (
            <div
              className="grid grid-cols-1 gap-4"
              style={{
                gridTemplateRows: `repeat(${sideImages.length}, minmax(0, 1fr))`,
              }}
            >
              {sideImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-video lg:aspect-auto rounded-xl overflow-hidden border border-border bg-muted shadow-sm"
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${idx + 2}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.section>

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
                {project.description}
              </p>
            </section>

            {project.highlights.length > 0 && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight">
                  <span className="p-2 rounded-lg bg-brand-accent/10">
                    <ListChecks className="h-5 w-5 text-sky-700 dark:text-brand-accent" />
                  </span>
                  {t("details.highlights")}
                </h2>
                <ul className="space-y-3">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-sky-700 dark:bg-brand-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.challenges.length > 0 && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight">
                  <span className="p-2 rounded-lg bg-brand-accent/10">
                    <Puzzle className="h-5 w-5 text-sky-700 dark:text-brand-accent" />
                  </span>
                  {t("details.challenges")}
                </h2>
                <ul className="space-y-3">
                  {project.challenges.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-sky-700 dark:bg-brand-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="md:col-span-2 md:sticky md:top-8 lg:col-span-1 rounded-2xl ">
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
                        {project.github_url && (
                          <Button
                            asChild
                            variant="outline"
                            className="h-10 w-full gap-2"
                          >
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GithubIcon className="h-4 w-4" />
                              {t("details.sourceCode")}
                            </a>
                          </Button>
                        )}
                        {project.demo_url && (
                          <Button
                            asChild
                            className="btn-brand-cta h-10 w-full gap-2"
                          >
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {t("details.liveDemo")}
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

                  <BadgeList items={project.technologies} variant="outline" />
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
