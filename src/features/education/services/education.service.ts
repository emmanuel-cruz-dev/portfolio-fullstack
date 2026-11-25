import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";
import { Education, EducationRaw, EducationFilters } from "../types";
import { Locale } from "@/shared";
import { escapeIlike, normalizeSearchTerm } from "@/lib/utils/search.utils";

export const PAGE_SIZE = 6;

function localizeEducation(education: EducationRaw, locale: Locale): Education {
  return {
    ...education,
    description: education.description[locale] ?? education.description.es,
  };
}

export async function getFeaturedEducation(
  locale: Locale
): Promise<Education[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("education", "featured-education");

  const supabase = createStaticClient();

  const { data: education, error } = await supabase
    .from("education")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("[getFeaturedEducation] Supabase error:", error.message);
    return [];
  }

  return ((education as unknown as EducationRaw[]) ?? []).map((e) =>
    localizeEducation(e, locale)
  );
}

export interface EducationPage {
  data: Education[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getFilteredEducation(
  locale: Locale,
  filters: EducationFilters
): Promise<EducationPage> {
  "use cache";
  cacheLife("hours");

  const normalizedSearch = filters.search
    ? normalizeSearchTerm(filters.search)
    : undefined;

  cacheTag(
    "education",
    "filtered-education",
    `education-type-${filters.type ?? "all"}`,
    `education-area-${filters.area ?? "all"}`,
    `education-featured-${filters.featured ?? "false"}`,
    `education-search-${normalizedSearch?.toLowerCase() || "none"}`,
    `education-page-${filters.page ?? 1}`
  );

  const page = Math.max(1, filters.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createStaticClient();

  let query = supabase
    .from("education")
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

  const { data: education, error, count } = await query;

  if (error) {
    console.error("[getFilteredEducation] Supabase error:", error.message);
    return { data: [], total: 0, totalPages: 0, currentPage: page };
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    data: ((education as unknown as EducationRaw[]) ?? []).map((e) =>
      localizeEducation(e, locale)
    ),
    total,
    totalPages,
    currentPage: page,
  };
}
