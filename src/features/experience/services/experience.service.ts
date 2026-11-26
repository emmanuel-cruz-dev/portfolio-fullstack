import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";
import { escapeIlike, normalizeSearchTerm } from "@/lib/utils/search.utils";
import type { Experience, ExperienceRaw } from "../types";
import { type Enums } from "@/types";
import { type Locale } from "@/shared";

const PAGE_SIZE = 6;

function localizeExperience(
  experience: ExperienceRaw,
  locale: Locale
): Experience {
  return {
    ...experience,
    description: experience.description[locale] ?? experience.description.es,
  };
}

export async function getFeaturedExperience(
  locale: Locale
): Promise<Experience[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("experience", "featured-experience");

  const supabase = createStaticClient();

  const { data: experience, error } = await supabase
    .from("experience")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("[getFeaturedExperience] Supabase error:", error.message);
    return [];
  }

  return ((experience as unknown as ExperienceRaw[]) ?? []).map((e) =>
    localizeExperience(e, locale)
  );
}

export async function getExperienceSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("experience", "experience-slugs");

  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("experience")
    .select("slug")
    .eq("is_active", true);

  if (error) {
    console.error("[getExperienceSlugs] Supabase error:", error.message);
    return [];
  }

  return (data ?? []).map((row) => row.slug);
}

export async function getExperienceBySlug(
  slug: string,
  locale: Locale
): Promise<Experience | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("experience", "experience-details");

  const supabase = createStaticClient();

  const { data: experience, error } = await supabase
    .from("experience")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("[getExperienceBySlug] Supabase error:", error.message);
    return null;
  }

  if (!experience) {
    return null;
  }

  return localizeExperience(experience as unknown as ExperienceRaw, locale);
}

interface ExperiencePage {
  data: Experience[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface ExperienceFilters {
  type?: Enums<"experience_type">;
  area?: Enums<"experience_area">;
  featured?: boolean;
  search?: string;
  page?: number;
}

export async function getFilteredExperience(
  locale: Locale,
  filters: ExperienceFilters
): Promise<ExperiencePage> {
  "use cache";
  cacheLife("hours");

  const normalizedSearch = filters.search
    ? normalizeSearchTerm(filters.search)
    : undefined;

  cacheTag(
    "experience",
    "filtered-experience",
    `experience-type-${filters.type ?? "all"}`,
    `experience-area-${filters.area ?? "all"}`,
    `experience-featured-${filters.featured ?? "false"}`,
    `experience-search-${normalizedSearch?.toLowerCase() || "none"}`,
    `experience-page-${filters.page ?? 1}`
  );

  const page = Math.max(1, filters.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createStaticClient();

  let query = supabase
    .from("experience")
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
      `project_name.ilike.${term},description->>es.ilike.${term},description->>en.ilike.${term}`
    );
  }

  query = query.order("start_date", { ascending: false }).range(from, to);

  const { data: experience, error, count } = await query;

  if (error) {
    console.error("[getFilteredExperience] Supabase error:", error.message);
    return { data: [], total: 0, totalPages: 0, currentPage: page };
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    data: ((experience as unknown as ExperienceRaw[]) ?? []).map((e) =>
      localizeExperience(e, locale)
    ),
    total,
    totalPages,
    currentPage: page,
  };
}
