"use client";

import Image from "next/image";
import { GraduationCap, Eye } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { formatMonthYear } from "@/lib/utils/date.utils";
import type { Locale } from "@/shared";
import { Education } from "../types";

export function EducationCard({ item }: { item: Education }) {
  const t = useTranslations("education.educationCard");
  const tAreas = useTranslations("education.educationAreas");
  const tTypes = useTranslations("education.educationTypes");
  const locale = useLocale() as Locale;

  return (
    <Card className="p-0 flex flex-col h-full overflow-hidden border-muted/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <div className="flex-1 flex flex-col">
        <CardHeader className="pt-6 pb-3">
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={item.institution}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <GraduationCap className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-1">
              <CardTitle className="text-base sm:text-lg line-clamp-2 font-bold leading-snug text-foreground">
                {item.institution}
              </CardTitle>
              <CardDescription className="text-xs font-medium text-primary/80">
                {formatMonthYear(new Date(item.start_date), locale)}
                {" - "}
                {item.end_date
                  ? formatMonthYear(new Date(item.end_date), locale)
                  : t("present")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-0 pb-4 flex-1 space-y-4 text-sm text-muted-foreground">
          <div>
            <h3 className="text-foreground text-base font-semibold leading-snug mb-1.5">
              {item.title}
            </h3>
            <p className="line-clamp-3 leading-relaxed text-muted-foreground/90">
              {item.description}
            </p>
          </div>

          {item.technologies && item.technologies.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-muted-foreground/80 tracking-wide uppercase">
                {t("keyTechnologies")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center bg-background border px-2 py-0.5 rounded text-xs font-medium text-foreground"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </div>

      {item.certificate_img && (
        <CardFooter className="py-4! px-4 border-t border-muted/40 bg-muted/10 flex items-center justify-end text-xs">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs font-medium cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                {t("viewCertificate")}
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] sm:max-w-150 max-h-[90vh] p-5 sm:p-6">
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
                <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                  {item.areas.slice(0, 2).map((area, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5"
                    >
                      {tAreas.has(area)
                        ? tAreas(area)
                        : String(area).replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
}
