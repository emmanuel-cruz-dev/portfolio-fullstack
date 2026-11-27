import { setRequestLocale } from "next-intl/server";

import { ExperienceGrid } from "@/features/experience";
import { getFilteredExperience } from "@/features/experience/services";
import { getPageMetadata } from "@/lib";
import type { Locale } from "@/shared";
import type { Enums } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "experience",
  });
}

export default async function ExperiencePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const rawSearchParams = await searchParams;

  setRequestLocale(locale);

  const search =
    typeof rawSearchParams.q === "string" ? rawSearchParams.q : undefined;
  const type =
    typeof rawSearchParams.type === "string"
      ? (rawSearchParams.type as Enums<"experience_type">)
      : undefined;
  const area =
    typeof rawSearchParams.area === "string"
      ? (rawSearchParams.area as Enums<"experience_area">)
      : undefined;
  const featured = rawSearchParams.featured === "true" || undefined;
  const parsedPage =
    typeof rawSearchParams.page === "string"
      ? parseInt(rawSearchParams.page, 10)
      : 1;

  const { data, totalPages } = await getFilteredExperience(locale as Locale, {
    type,
    area,
    featured,
    search,
    page: isNaN(parsedPage) ? 1 : parsedPage,
  });

  return <ExperienceGrid experience={data} totalPages={totalPages} />;
}
