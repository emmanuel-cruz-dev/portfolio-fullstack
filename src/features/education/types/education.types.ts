import type { Tables, TablesInsert, TablesUpdate } from "@/types";
import type { Translatable } from "@/shared";

export type EducationRaw = Tables<"education"> & {
  description: Translatable;
};

export type Education = Omit<EducationRaw, "description"> & {
  description: string;
};

export type EducationInsert = TablesInsert<"education">;
export type EducationUpdate = TablesUpdate<"education">;
