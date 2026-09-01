import type { Tables, TablesInsert, TablesUpdate } from "@/types";
import type { Translatable } from "@/shared";

export type ExperienceRaw = Tables<"experience"> & {
  description: Translatable;
};

export type Experience = Omit<ExperienceRaw, "description"> & {
  description: string;
};

export type ExperienceInsert = TablesInsert<"experience">;
export type ExperienceUpdate = TablesUpdate<"experience">;
