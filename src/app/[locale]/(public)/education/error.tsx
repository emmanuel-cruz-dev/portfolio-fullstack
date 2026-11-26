"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components";

export default function EducationError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("education.error");

  useEffect(() => {
    console.error("[EducationError] Boundary caught error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-destructive/20 bg-destructive/5 space-y-4">
      <div className="p-3 rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-bold text-foreground">{t("title")}</h3>
        <p className="text-xs text-muted-foreground">{t("description")}</p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => reset()}
        className="gap-2 text-xs font-medium cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {t("retry")}
      </Button>
    </div>
  );
}
