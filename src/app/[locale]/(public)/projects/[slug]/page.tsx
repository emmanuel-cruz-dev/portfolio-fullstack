import { setRequestLocale } from "next-intl/server";

import { getProjectSlugs } from "@/features/projects/services/projects.service";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <h1>{slug}</h1>;
}

export default ProjectPage;
