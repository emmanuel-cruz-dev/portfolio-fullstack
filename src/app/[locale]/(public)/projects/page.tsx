import { getPageMetadata } from "@/lib/utils/metadata";
import { ProjectsContent } from "@/features/projects";

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
