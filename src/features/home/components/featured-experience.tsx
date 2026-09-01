import { getLocale, getTranslations } from "next-intl/server";

import { ExperienceCard } from "@/features/experience";
import { getFeaturedExperience } from "@/features/experience/services";
import { FeaturedSection, type Locale } from "@/shared";

export async function FeaturedExperience() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.featuredExperience");
  const experiences = await getFeaturedExperience(locale);

  return (
    <FeaturedSection
      title={t("title")}
      subtitle={t("subtitle")}
      items={experiences}
      CardComponent={ExperienceCard}
      href="/experience"
      actionLabel={t("actionLabel")}
    />
  );
}
