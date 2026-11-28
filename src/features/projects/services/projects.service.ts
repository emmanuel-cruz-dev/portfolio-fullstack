import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";
import { escapeIlike, normalizeSearchTerm } from "@/lib/utils/search.utils";
import { Project, ProjectRaw } from "../types";
import { type Enums } from "@/types";
import { type Locale } from "@/shared";

const PAGE_SIZE = 6;

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

export async function getProjectSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("projects", "project-slugs");

  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("is_active", true);

  if (error) {
    console.error("[getProjectSlugs] Supabase error:", error.message);
    return [];
  }

  return (data ?? []).map((row) => row.slug);
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<Project | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects", "project-details");

  const supabase = createStaticClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("[getProjectBySlug] Supabase error:", error.message);
    return null;
  }

  if (!project) {
    return null;
  }

  return localizeProject(project as unknown as ProjectRaw, locale);
}

interface ProjectPage {
  data: Project[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface ProjectFilters {
  type?: Enums<"project_type">;
  area?: Enums<"project_area">;
  featured?: boolean;
  search?: string;
  page?: number;
}

export async function getFilteredProject(
  locale: Locale,
  filters: ProjectFilters
): Promise<ProjectPage> {
  "use cache";
  cacheLife("hours");

  const normalizedSearch = filters.search
    ? normalizeSearchTerm(filters.search)
    : undefined;

  cacheTag(
    "project",
    "filtered-project",
    `project-type-${filters.type ?? "all"}`,
    `project-area-${filters.area ?? "all"}`,
    `project-featured-${filters.featured ?? "false"}`,
    `project-search-${normalizedSearch?.toLowerCase() || "none"}`,
    `project-page-${filters.page ?? 1}`
  );

  const page = Math.max(1, filters.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createStaticClient();

  let query = supabase
    .from("projects")
    .select("*", { count: "exact" })
    .eq("is_active", true);

  if (filters.type) {
    query = query.eq("type", filters.type);
  }

  if (filters.area) {
    query = query.contains("areas", [filters.area]);
  }

  if (filters.featured) {
    query = query.eq("featured", true);
  }

  if (normalizedSearch) {
    const term = `%${escapeIlike(normalizedSearch)}%`;
    query = query.or(
      `title.ilike.${term},description->>es.ilike.${term},description->>en.ilike.${term}`
    );
  }

  query = query.order("start_date", { ascending: false }).range(from, to);

  const { data: project, error, count } = await query;

  if (error) {
    console.error("[getFilteredProject] Supabase error:", error.message);
    return { data: [], total: 0, totalPages: 0, currentPage: page };
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    data: ((project as unknown as ProjectRaw[]) ?? []).map((e) =>
      localizeProject(e, locale)
    ),
    total,
    totalPages,
    currentPage: page,
  };
}
