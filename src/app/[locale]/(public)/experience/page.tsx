import { ExperienceContent } from "@/features/experience";
import { getPageMetadata } from "@/lib";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "experience",
  });
}

function ExperiencePage() {
  return <ExperienceContent />;
}

export default ExperiencePage;
