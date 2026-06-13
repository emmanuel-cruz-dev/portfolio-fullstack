import { ExperiencePageClient } from "@/components";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "experiencePage",
  });
}

function ExperiencePage() {
  return <ExperiencePageClient />;
}

export default ExperiencePage;
