import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getProjectSlugs } from "@/features/projects/services";
import { ProjectDetailsPlaceholder } from "@/features/projects";

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

  return <ProjectDetailsPlaceholder slug={slug} />;
}

export default ProjectPage;
