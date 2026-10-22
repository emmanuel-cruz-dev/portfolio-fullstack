import { useTranslations } from "next-intl";

export function useProjectLabels() {
  const tTypes = useTranslations("projects.types");
  const tStatus = useTranslations("projects.status");
  const tAreas = useTranslations("projects.areas");

  const fallback = (v: string) => v.replace(/_/g, " ");

  return {
    type: (v: string) => (tTypes.has(v) ? tTypes(v) : fallback(v)),
    status: (v: string) => (tStatus.has(v) ? tStatus(v) : fallback(v)),
    area: (v: string) => (tAreas.has(v) ? tAreas(v) : fallback(v)),
  };
}
