import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";

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
