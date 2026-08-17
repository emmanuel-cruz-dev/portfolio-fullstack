import { setRequestLocale } from "next-intl/server";

export default async function ExperienceDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <h1>Experience Dashboard</h1>
    </div>
  );
}
