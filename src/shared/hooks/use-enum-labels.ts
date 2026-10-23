import { useTranslations } from "next-intl";

export function useEnumLabels() {
  const tTypes = useTranslations("shared.enums.types");
  const tStatus = useTranslations("shared.enums.status");
  const tAreas = useTranslations("shared.enums.areas");

  const fallback = (v: string) => v.replace(/_/g, " ");

  return {
    type: (v: string) => (tTypes.has(v) ? tTypes(v) : fallback(v)),
    status: (v: string) => (tStatus.has(v) ? tStatus(v) : fallback(v)),
    area: (v: string) => (tAreas.has(v) ? tAreas(v) : fallback(v)),
  };
}
