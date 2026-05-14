import {
  AboutSection,
  HeroHome,
  SkillsSection,
  StatsSection,
} from "@/components";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "homePage",
  });
}

function HomePage() {
  return (
    <>
      <HeroHome />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
    </>
  );
}

export default HomePage;
