import { setRequestLocale } from "next-intl/server";

async function ProjectEditPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return null;
}

export default ProjectEditPage;
