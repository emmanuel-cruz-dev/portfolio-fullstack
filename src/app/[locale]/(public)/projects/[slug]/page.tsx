import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { getProjectBySlug } from "@/features/projects/services";
import {
  ProjectDetailsPlaceholder,
  ProjectNotFound,
} from "@/features/projects";
import { CtaSection, Locale } from "@/shared";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    const t = await getTranslations({ locale, namespace: "projects" });
    return { title: t("notFound.title") };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: project.images[0] ? [{ url: project.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.images[0] ? [project.images[0]] : undefined,
    },
  };
}

async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return (
      <main className="section-gradient-c flex flex-col">
        <ProjectNotFound slug={slug} />
        <CtaSection translationKey="projects.notFound.cta" />
      </main>
    );
  }

  setRequestLocale(locale);

  return <ProjectDetailsPlaceholder slug={slug} />;
}

export default ProjectPage;
