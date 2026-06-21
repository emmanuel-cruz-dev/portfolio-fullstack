import { EducationClient } from "@/features/education";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "educationPage",
  });
}

function EducationPage() {
  return <EducationClient />;
}

export default EducationPage;
