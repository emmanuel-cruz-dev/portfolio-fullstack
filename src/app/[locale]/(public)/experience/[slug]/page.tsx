import { setRequestLocale } from "next-intl/server";

import { getExperienceSlugs } from "@/features/experience/services/experience.service";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const slugs = await getExperienceSlugs();

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

async function ExperienceSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <h1>{slug}</h1>;
}

export default ExperienceSlugPage;
