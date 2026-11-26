import { setRequestLocale } from "next-intl/server";

import { EducationGrid } from "@/features/education";
import { getFilteredEducation } from "@/features/education/services";
import { getPageMetadata } from "@/lib";
import type { Locale } from "@/shared";
import type { Enums } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "education",
  });
}

export default async function EducationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const rawSearchParams = await searchParams;

  setRequestLocale(locale);

  const search =
    typeof rawSearchParams.q === "string" ? rawSearchParams.q : undefined;
  const type =
    typeof rawSearchParams.type === "string"
      ? (rawSearchParams.type as Enums<"education_type">)
      : undefined;
  const area =
    typeof rawSearchParams.area === "string"
      ? (rawSearchParams.area as Enums<"education_area">)
      : undefined;
  const featured = rawSearchParams.featured === "true" || undefined;
  const parsedPage =
    typeof rawSearchParams.page === "string"
      ? parseInt(rawSearchParams.page, 10)
      : 1;

  const { data, totalPages } = await getFilteredEducation(locale as Locale, {
    type,
    area,
    featured,
    search,
    page: isNaN(parsedPage) ? 1 : parsedPage,
  });

  return <EducationGrid education={data} totalPages={totalPages} />;
}
