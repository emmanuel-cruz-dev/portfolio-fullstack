import { useTranslations } from "next-intl";
import { Mail, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components";

export function CtaSection({
  translationKey = "shared.cta",
  contactHref = "/contact",
}: {
  translationKey?: string;
  contactHref?: string;
}) {
  const t = useTranslations(translationKey);

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-slate-100 dark:bg-slate-900/50 backdrop-blur-sm p-8 md:p-12 text-center flex flex-col items-center justify-center gap-6 shadow-xs">
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />

        <figure className="p-3.5 rounded-full bg-primary/10 text-primary">
          <Mail className="w-6 h-6" />
        </figure>

        <header className="space-y-3 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </header>

        <div className="pt-2">
          <Button asChild size="lg" className="gap-2 cursor-pointer shadow-sm">
            <Link href={contactHref}>
              {t("button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
