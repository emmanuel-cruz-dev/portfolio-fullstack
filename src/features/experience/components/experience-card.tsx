import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Building2, Calendar } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { CardContent, CardHeader } from "@/components";
import {
  BadgeList,
  CardLinks,
  ContentCard,
  ContentCardFooter,
  LogoAvatar,
  TypeBadge,
  type Locale,
} from "@/shared";
import { formatDateRange } from "@/lib/utils/date.utils";
import { Experience } from "../types";

export function ExperienceCard({ item }: { item: Experience }) {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;

  return (
    <ContentCard className="group has-[h3_a:focus-visible]:ring-2 has-[h3_a:focus-visible]:ring-ring/50">
      <CardHeader className="pt-6 pb-3">
        <div className="flex items-start gap-4">
          <LogoAvatar
            src={item.company_logo}
            alt={item.company}
            Fallback={Building2}
          />
          <div className="min-w-0 flex-1 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="line-clamp-2 text-base font-bold leading-snug sm:text-lg">
                <Link
                  href={`/experience/${item.slug}`}
                  className="outline-none transition-colors after:absolute after:inset-0 group-hover:text-primary"
                >
                  {item.project_name}
                </Link>
              </h3>
              <p className="text-sm font-medium text-primary/60 dark:text-primary/80">
                {item.company}
              </p>
            </div>
            <TypeBadge type={item.type} variant="outline" className="text-xs" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 pb-6">
        <div className="space-y-2">
          <time
            dateTime={item.start_date}
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Calendar className="size-4" />
            {formatDateRange(
              item.start_date,
              item.end_date,
              t("experienceCard.present"),
              locale
            )}
          </time>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
        <BadgeList items={item.technologies} max={8} variant="outline" />
      </CardContent>

      <ContentCardFooter>
        <CardLinks
          githubUrl={item.github_url}
          demoUrl={item.demo_url}
          githubLabel={t("experienceCard.github")}
          demoLabel={t("experienceCard.demo")}
        />
        <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          {t("experienceCard.viewDetails")}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </ContentCardFooter>
    </ContentCard>
  );
}
