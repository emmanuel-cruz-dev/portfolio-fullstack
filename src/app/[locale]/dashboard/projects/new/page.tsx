import { setRequestLocale } from "next-intl/server";

async function ProjectNewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return null;
}

export default ProjectNewPage;
