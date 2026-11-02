import { ProjectsContent } from "@/features/projects";
import { getPageMetadata } from "@/lib";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "projects",
  });
}

function ProjectsPage() {
  return <ProjectsContent />;
}

export default ProjectsPage;
