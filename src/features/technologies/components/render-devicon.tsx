import { getDevicon } from "@/lib";

export function renderDevicon(
  name: string,
  props: { size?: string | number; className?: string } = {}
) {
  const Icon = getDevicon(name);
  return Icon ? <Icon {...props} /> : null;
}
