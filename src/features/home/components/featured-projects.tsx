import { getTranslations } from "next-intl/server";

import { FeaturedSection } from "@/shared";
import { ProjectCard } from "@/features/projects";
import { getFeaturedProjects } from "@/features/projects/services";
import { type Locale } from "@/shared";

export async function FeaturedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations("home.featuredProjects");
  const projects = await getFeaturedProjects(locale);

  return (
    <FeaturedSection
      title={t("title")}
      subtitle={t("subtitle")}
      items={projects}
      CardComponent={ProjectCard}
      href="/projects"
      actionLabel={t("actionLabel")}
    />
  );
}
