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
  return (
    <div>
      <h1>Education</h1>
    </div>
  );
}

export default EducationPage;
