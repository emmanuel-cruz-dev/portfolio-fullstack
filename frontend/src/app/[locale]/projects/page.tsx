import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return getPageMetadata({
    locale: params.locale,
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
