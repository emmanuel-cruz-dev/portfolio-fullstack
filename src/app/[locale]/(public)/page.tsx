import { HomeContent } from "@/features/home";
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
  return <HomeContent />;
}

export default HomePage;
