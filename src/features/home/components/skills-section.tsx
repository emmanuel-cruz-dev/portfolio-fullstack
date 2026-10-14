import { getTranslations } from "next-intl/server";

import {
  getTechnologiesByCategory,
  CategoryCard,
} from "@/features/technologies";
import { SectionHeader } from "@/shared";
import { CATEGORIES } from "../constants";

export async function SkillsSection() {
  const [byCategory, t] = await Promise.all([
    getTechnologiesByCategory(),
    getTranslations("home.skillsSection"),
  ]);

  return (
    <section className="section-gradient-a px-4 py-16 text-foreground md:py-20 xl:px-0">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-11 gap-4">
          {CATEGORIES.map(({ id, Icon, from, to, span }) => {
            const technologies = byCategory[id];
            if (!technologies?.length) return null;

            return (
              <CategoryCard
                key={id}
                title={t(`categories.${id}`)}
                icon={<Icon className="h-4 w-4" />}
                technologies={technologies}
                gradientFrom={from}
                gradientTo={to}
                className={span}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
