import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";
import { Education, EducationRaw } from "../types";
import { Locale } from "@/shared";

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
