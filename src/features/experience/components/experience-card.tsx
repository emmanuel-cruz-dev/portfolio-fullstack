"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Building2, Calendar, ExternalLink } from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  GithubIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";
import { type Locale, BadgeList, TypeBadge } from "@/shared";
import { formatMonthYear } from "@/lib/utils/date.utils";
import { Experience } from "../types";

export function ExperienceCard({ item }: { item: Experience }) {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;

  return (
    <Card className="flex flex-col h-full overflow-hidden border-muted/60 bg-sky-50/70 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
            {item.company_logo ? (
              <Image
                src={item.company_logo}
                alt={item.company}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground" />
            )}
          </div>

          <div className="space-y-1 flex-1">
            <CardTitle className="text-base sm:text-lg line-clamp-2 font-bold leading-snug text-foreground">
              {item.project_name}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {item.company}
              </span>
              <TypeBadge
                type={item.type}
                variant="outline"
                className="text-xs"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatMonthYear(new Date(item.start_date), locale)}
            {item.end_date
              ? ` - ${formatMonthYear(new Date(item.end_date), locale)}`
              : ` - ${t("experienceCard.present")}`}
          </span>
        </div>

        <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-4">
          {item.description}
        </p>

        <BadgeList items={item.technologies} max={8} variant="outline" />

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex gap-3">
            {item.github_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{t("experienceCard.github")}</p>
                </TooltipContent>
              </Tooltip>
            )}
            {item.demo_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Demo"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{t("experienceCard.demo")}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Button asChild variant="ghost" size="sm" className="group/button">
            <Link href={`/experience/${item.slug}`}>
              {t("experienceCard.viewDetails")}
              <ArrowRight className="h-3.5 w-3.5 group-hover/button:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
