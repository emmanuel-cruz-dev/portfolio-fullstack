import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "projectsPage",
  });
}

function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}

export default ProjectsPage;
