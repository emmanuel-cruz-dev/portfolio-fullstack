import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";
import { Project, ProjectRaw } from "../types";
import { Locale } from "@/shared";

function localizeProject(project: ProjectRaw, locale: Locale): Project {
  return {
    ...project,
    description: project.description[locale] ?? project.description.es,
    highlights: project.highlights[locale] ?? project.highlights.es,
    challenges: project.challenges[locale] ?? project.challenges.es,
  };
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects", "featured-projects");

  const supabase = createStaticClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("[getProjects] Supabase error:", error.message);
    return [];
  }

  return ((projects as unknown as ProjectRaw[]) ?? []).map((p) =>
    localizeProject(p, locale)
  );
}
