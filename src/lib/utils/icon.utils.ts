import * as Devicons from "devicons-react";
import { toPascalCase } from "./string.utils";

const icons = Devicons as Record<
  string,
  React.ComponentType<{ size?: string | number }> | undefined
>;

export function getDevicon(name: string) {
  const base = toPascalCase(name);
  return icons[`${base}Original`] ?? icons[`${base}Plain`];
}
