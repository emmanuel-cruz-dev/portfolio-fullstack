import type { Tables, TablesInsert, TablesUpdate, Enums } from "@/types";
import type { Translatable } from "@/shared";

export type EducationRaw = Tables<"education"> & {
  description: Translatable;
};

export type Education = Omit<EducationRaw, "description"> & {
  description: string;
};

export type EducationInsert = TablesInsert<"education">;
export type EducationUpdate = TablesUpdate<"education">;

export interface EducationFilters {
  type?: Enums<"education_type">;
  area?: Enums<"education_area">;
  featured?: boolean;
  search?: string;
  page?: number;
}
