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
