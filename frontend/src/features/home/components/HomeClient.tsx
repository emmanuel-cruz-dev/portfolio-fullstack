import { StatsSection } from "@/shared";
import { HeroHome } from "./HeroHome";
import { AboutSection } from "./AboutSection";
import { SkillsSection } from "./SkillsSection";

export function HomeClient() {
  return (
    <>
      <HeroHome />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
    </>
  );
}
