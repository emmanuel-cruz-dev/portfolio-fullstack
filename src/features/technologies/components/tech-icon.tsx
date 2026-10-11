import * as Devicons from "devicons-react";
import { Cpu } from "lucide-react";

import { toPascalCase } from "@/lib/utils/";

const icons = Devicons as Record<
  string,
  React.ComponentType<{ size?: string | number }> | undefined
>;

export function TechIcon({ name }: { name: string }) {
  const base = toPascalCase(name);
  const Icon = icons[`${base}Original`] ?? icons[`${base}Plain`] ?? Cpu;

  return <Icon size={36} />;
}
