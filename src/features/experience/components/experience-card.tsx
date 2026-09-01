"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Building2, Calendar, ExternalLink } from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components";
import { Locale } from "@/shared";
import { formatMonthYear } from "@/lib/utils/date.utils";
import { Experience } from "../types";

export function ExperienceCard({ item }: { item: Experience }) {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;

  const typeLabels = {
    EMPLOYMENT: t("experienceTypes.EMPLOYMENT"),
    FREELANCE: t("experienceTypes.FREELANCE"),
    INTERNSHIP: t("experienceTypes.INTERNSHIP"),
    VOLUNTEER: t("experienceTypes.VOLUNTEER"),
    ACADEMIC: t("experienceTypes.ACADEMIC"),
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden border-muted/60 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
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
              <Badge variant="outline" className="text-xs">
                {typeLabels[item.type] || item.type}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatMonthYear(new Date(item.start_date), locale)}
            {item.end_date
              ? ` - ${formatMonthYear(new Date(item.end_date), locale)}`
              : ` - ${t("experienceCard.present")}`}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-4">
          {item.description}
        </p>

        {/* Technologies */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {item.technologies.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{item.technologies.length - 5}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex gap-3">
            {item.github_url && (
              <a
                href={item.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}
            {item.demo_url && (
              <a
                href={item.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
          <Link href={`/experience/${item.slug}`}>
            <Button variant="ghost" size="sm" className="gap-1 cursor-pointer">
              {t("experienceCard.viewDetails")}
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
