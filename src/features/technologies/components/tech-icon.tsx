import { FileCode } from "lucide-react";

import { cn } from "@/lib";
import { renderDevicon } from "./render-devicon";

const INVERT_IN_DARK = new Set(["nextjs", "express", "github", "prisma"]);

export function TechIcon({ name }: { name: string }) {
  return (
    renderDevicon(name, {
      size: 20,
      className: cn(INVERT_IN_DARK.has(name) && "dark:invert"),
    }) ?? <FileCode size={20} />
  );
}
