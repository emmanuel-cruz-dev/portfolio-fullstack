import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return getPageMetadata({
    locale: params.locale,
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
