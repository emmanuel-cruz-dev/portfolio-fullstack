import { cacheLife, cacheTag } from "next/cache";

import { createStaticClient } from "@/lib/supabase/static";
import { Technology } from "../types";

export async function getTechnologies(): Promise<Technology[]> {
  "use cache";
  cacheLife("days");
  cacheTag("technologies");

  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("technologies")
    .select("*")
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("[getTechnologies] Supabase error:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getTechnologiesByCategory() {
  const technologies = await getTechnologies();
  return Object.groupBy(technologies, (tech) => tech.category.toLowerCase());
}

const CLOUD_CATEGORIES = ["FRONTEND", "BACKEND", "DATABASE", "MOBILE"];

export async function getCloudTechnologies(): Promise<Technology[]> {
  const technologies = await getTechnologies();
  return technologies.filter((tech) =>
    CLOUD_CATEGORIES.includes(tech.category)
  );
}
