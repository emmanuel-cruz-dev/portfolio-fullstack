import HeroHome from "@/components/home/HeroHome";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return getPageMetadata({
    locale: params.locale,
    namespace: "homePage",
  });
}

function HomePage() {
  return <HeroHome />;
}

export default HomePage;
