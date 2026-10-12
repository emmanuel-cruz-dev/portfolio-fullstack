import * as Devicons from "devicons-react";
import { FileCode } from "lucide-react";

import { toPascalCase } from "@/lib/utils/";
import { cn } from "@/lib";

const icons = Devicons as Record<
  string,
  React.ComponentType<{ size?: string | number }> | undefined
>;

const INVERT_IN_DARK = new Set(["nextjs", "express", "github", "prisma"]);

export function TechIcon({ name }: { name: string }) {
  const base = toPascalCase(name);
  const Icon = icons[`${base}Original`] ?? icons[`${base}Plain`] ?? FileCode;

  return (
    <Icon size={20} className={cn(INVERT_IN_DARK.has(name) && "dark:invert")} />
  );
}
