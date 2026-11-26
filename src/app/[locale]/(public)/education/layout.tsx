import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { EducationFilters } from "@/features/education";
import { PageHeader } from "@/shared";

export default async function EducationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("education.pageHeader");

  return (
    <section className="min-h-screen py-16 bg-background px-4 xl:px-0">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          description={t("description")}
        />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <Suspense fallback={null}>
            <EducationFilters />
          </Suspense>
          <div className="flex-1 w-full min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
