import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";
import { type Experience, type ExperienceRaw } from "../types";
import { type Locale } from "@/shared";

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
