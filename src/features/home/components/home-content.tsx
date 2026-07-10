import { StatsSection } from "@/shared";
import { HeroHome } from "./hero-home";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";

export function HomeContent() {
  return (
    <>
      <HeroHome />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
    </>
  );
}
