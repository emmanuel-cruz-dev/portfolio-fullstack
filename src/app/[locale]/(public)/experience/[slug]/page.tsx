import { Suspense } from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import {
  getExperienceSlugs,
  getExperienceBySlug,
} from "@/features/experience/services";
import { ExperienceDetails, ExperienceNotFound } from "@/features/experience";
import { CtaSection, type Locale } from "@/shared";

type ExperiencePageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getExperienceSlugs();

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const experience = await getExperienceBySlug(slug, locale);

  if (!experience) {
    const t = await getTranslations({ locale, namespace: "experience" });
    return { title: t("notFound.title") };
  }

  return {
    title: experience.project_name ?? experience.position,
    description: experience.description,
    openGraph: {
      title: experience.project_name ?? experience.position,
      description: experience.description,
      type: "article",
    },
    twitter: {
      title: experience.project_name ?? experience.position,
      description: experience.description,
    },
  };
}

async function ExperienceContent({ params }: ExperiencePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const experience = await getExperienceBySlug(slug, locale);

  if (!experience) {
    return (
      <main className="section-gradient-c flex flex-col">
        <ExperienceNotFound slug={slug} />
        <CtaSection translationKey="experience.notFound.cta" />
      </main>
    );
  }

  return (
    <main className="section-gradient-c">
      <ExperienceDetails experience={experience} />
      <CtaSection translationKey="experience.details.cta" />
    </main>
  );
}

async function ExperienceSlugPage({ params }: ExperiencePageProps) {
  return (
    <Suspense fallback={null}>
      <ExperienceContent params={params} />
    </Suspense>
  );
}

export default ExperienceSlugPage;
