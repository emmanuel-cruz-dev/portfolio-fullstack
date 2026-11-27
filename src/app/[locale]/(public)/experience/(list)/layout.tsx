import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { ExperienceFilters } from "@/features/experience";
import { Locale, PageHeader } from "@/shared";

export default async function ExperienceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("experience.pageHeader");

  return (
    <section className="section-gradient-c py-16 bg-background px-4 xl:px-0">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          description={t("description")}
        />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <Suspense fallback={null}>
            <ExperienceFilters />
          </Suspense>
          <div className="flex-1 w-full min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
