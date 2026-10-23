import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/features/projects/services";
import { routing } from "@/i18n/routing";
import { ProjectDetails, ProjectNotFound } from "@/features/projects";
import { CtaSection, Locale } from "@/shared";

type ProjectPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    const t = await getTranslations({ locale, namespace: "projects" });
    return { title: t("notFound.title") };
  }

  const image = project.images[0];

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return (
      <main className="section-gradient-c flex flex-col">
        <ProjectNotFound slug={slug} />
        <CtaSection translationKey="projects.notFound.cta" />
      </main>
    );
  }

  return (
    <main className="section-gradient-c">
      <ProjectDetails project={project} />
    </main>
  );
}

async function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={null}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

export default ProjectPage;
