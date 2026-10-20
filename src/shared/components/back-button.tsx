"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components";

export function BackButton() {
  const router = useRouter();
  const t = useTranslations("shared.components.backButton");

  return (
    <Button
      variant="outline"
      className="cursor-pointer shadow-sm px-12! xl:px-16! h-12 font-bold"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      {t("label")}
    </Button>
  );
}
