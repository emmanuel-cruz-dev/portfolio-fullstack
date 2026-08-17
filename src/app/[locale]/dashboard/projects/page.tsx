import { setRequestLocale } from "next-intl/server";

export default async function ProjectsDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <h1>Projects Dashboard</h1>
    </div>
  );
}
