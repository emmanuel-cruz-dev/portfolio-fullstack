"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { GraduationCap, Eye, Calendar } from "lucide-react";

import {
  Button,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import {
  BadgeList,
  ContentCard,
  ContentCardFooter,
  LogoAvatar,
  useEnumLabels,
  type Locale,
} from "@/shared";
import { formatDateRange } from "@/lib/utils/date.utils";
import { Education } from "../types";

export function EducationCard({ item }: { item: Education }) {
  const t = useTranslations("education.educationCard");
  const tTypes = useTranslations("shared.enums.types");
  const labels = useEnumLabels();
  const locale = useLocale() as Locale;

  return (
    <ContentCard>
      <CardHeader className="pt-6 pb-3">
        <div className="flex items-start gap-4">
          <LogoAvatar
            src={item.logo}
            alt={item.institution}
            Fallback={GraduationCap}
          />
          <div className="min-w-0 space-y-1">
            <h3 className="line-clamp-2 text-base font-bold leading-snug sm:text-lg">
              {item.title}
            </h3>
            <p className="text-sm font-medium text-primary/60 dark:text-primary/80">
              {item.institution}
            </p>
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
              t("present"),
              locale
            )}
          </time>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>

        {item.technologies?.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("keyTechnologies")}
            </p>
            <BadgeList items={item.technologies} max={8} variant="outline" />
          </div>
        )}
      </CardContent>

      {item.certificate_img && (
        <ContentCardFooter className="justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs font-medium cursor-pointer"
              >
                <Eye className="size-3.5" />
                {t("viewCertificate")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-150 max-h-[90vh] p-5 sm:p-6 bg-sky-50 dark:bg-card">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg font-semibold line-clamp-2">
                  {item.title} |{" "}
                  {tTypes.has(item.type) ? tTypes(item.type) : item.type}
                </DialogTitle>
              </DialogHeader>

              <div className="relative w-full aspect-900/617 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={item.certificate_img}
                  alt={t("certificateAlt", { title: item.title })}
                  fill
                  sizes="(max-width: 640px) 95vw, 600px"
                  className="object-cover"
                  priority={false}
                />
              </div>

              <DialogFooter className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h4 className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                  {t("educationAreas")}
                </h4>
                <BadgeList
                  items={item.areas}
                  max={3}
                  variant="secondary"
                  format={labels.area}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ContentCardFooter>
      )}
    </ContentCard>
  );
}
