import { getLocale, getTranslations } from "next-intl/server";

import { FeaturedSection } from "@/shared";
import { EducationCard } from "@/features/education";
import { getFeaturedEducation } from "@/features/education/services";
import { type Locale } from "@/shared";

export async function FeaturedEducation() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.featuredEducation");
  const educations = await getFeaturedEducation(locale);

  return (
    <FeaturedSection
      title={t("title")}
      subtitle={t("subtitle")}
      items={educations}
      CardComponent={EducationCard}
      href="/education"
      actionLabel={t("actionLabel")}
    />
  );
}
