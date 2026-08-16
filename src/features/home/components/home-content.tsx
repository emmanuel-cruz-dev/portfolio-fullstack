import { Suspense } from "react";
import { getLocale } from "next-intl/server";

import {
  FeaturedSectionSkeleton,
  CtaSection,
  StatsSection,
  type Locale,
} from "@/shared";
import { HeroHome } from "./hero-home";
import { FeaturedEducation } from "./featured-education";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";

export async function HomeContent() {
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <HeroHome />
      <StatsSection />
      <AboutSection />
      <Suspense fallback={<FeaturedSectionSkeleton />}>
        <FeaturedEducation locale={locale} />
      </Suspense>
      <SkillsSection />
      <CtaSection />
    </>
  );
}
