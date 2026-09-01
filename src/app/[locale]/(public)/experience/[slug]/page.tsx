import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getExperienceSlugs } from "@/features/experience/services";
import { ExperienceDetailsPlaceholder } from "@/features/experience";

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

  return <ExperienceDetailsPlaceholder slug={slug} />;
}

export default ExperienceSlugPage;
