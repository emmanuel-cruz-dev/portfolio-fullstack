import { useTranslations } from "next-intl";

import { ShimmerButton } from "@/components";

export function StatusBadge() {
  const t = useTranslations("shared.components.statusBadge");

  return (
    <ShimmerButton className="flex gap-2 scale-75 origin-left select-none cursor-default">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      {t("available")}
    </ShimmerButton>
  );
}
