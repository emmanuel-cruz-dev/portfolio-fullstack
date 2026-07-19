import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export async function getFeaturedProjects(): Promise<any[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

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

  return projects ?? [];
}
