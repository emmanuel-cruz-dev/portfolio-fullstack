import { Fragment } from "react";

import { IconCloud } from "@/components";
import { getCloudTechnologies } from "@/features/technologies/services";
import { renderDevicon } from "@/features/technologies/components/render-devicon";

export async function IconCloudItem() {
  const technologies = await getCloudTechnologies();

  const icons = technologies.flatMap((tech) => {
    const icon = renderDevicon(tech.icon!, { size: 100 });
    return icon ? [<Fragment key={tech.id}>{icon}</Fragment>] : [];
  });

  return (
    <article className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud icons={icons} />
    </article>
  );
}
