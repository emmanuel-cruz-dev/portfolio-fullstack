"use client";

import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLocale = () => {
    const next = currentLocale === "es" ? "en" : "es";
    router.replace(pathname, { locale: next });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="h-9 w-9 rounded-full font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
    >
      {currentLocale === "es" ? "EN" : "ES"}
    </Button>
  );
}
