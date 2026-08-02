import { setRequestLocale } from "next-intl/server";

import { EducationContent } from "@/features/education";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "education",
  });
}

async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EducationContent />;
}

export default EducationPage;
