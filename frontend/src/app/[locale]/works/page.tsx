import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "worksPage",
  });
}

function WorksPage() {
  return (
    <div>
      <h1>Works</h1>
    </div>
  );
}

export default WorksPage;
