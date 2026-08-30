import { Suspense } from "react";

import {
  FeaturedSectionSkeleton,
  // CtaSection,
  StatsSection,
} from "@/shared";
import { HeroHome } from "./hero-home";
import { FeaturedEducation } from "./featured-education";
// import { AboutSection } from "./about-section";
// import { SkillsSection } from "./skills-section";

export async function HomeContent() {
  return (
    <>
      <HeroHome />
      <StatsSection />
      {/* <AboutSection /> */}
      <Suspense fallback={<FeaturedSectionSkeleton />}>
        <FeaturedEducation />
      </Suspense>
      {/* <SkillsSection />
      <CtaSection /> */}
    </>
  );
}
