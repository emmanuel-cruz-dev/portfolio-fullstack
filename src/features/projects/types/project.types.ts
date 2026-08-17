import type { Tables, TablesInsert, TablesUpdate } from "@/types";
import type { Translatable, TranslatableList } from "@/shared";

export type ProjectRaw = Omit<
  Tables<"projects">,
  "description" | "highlights" | "challenges"
> & {
  description: Translatable;
  highlights: TranslatableList;
  challenges: TranslatableList;
};

export type Project = Omit<
  ProjectRaw,
  "description" | "highlights" | "challenges"
> & {
  description: string;
  highlights: string[];
  challenges: string[];
};

export type ProjectInsert = TablesInsert<"projects">;
export type ProjectUpdate = TablesUpdate<"projects">;
