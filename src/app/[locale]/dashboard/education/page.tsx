import { setRequestLocale } from "next-intl/server";

export default async function EducationDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <h1>Education Dashboard</h1>
    </div>
  );
}
