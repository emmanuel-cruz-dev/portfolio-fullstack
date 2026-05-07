import { useTranslations } from "next-intl";
import { Code2, ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SocialLinksItem from "@/components/shared/SocialLinksItem";

function Footer() {
  const t = useTranslations("layout.footer");

  const FOOTER_LINKS = {
    portfolio: [
      { label: t("home"), href: "/" },
      { label: t("projects"), href: "/projects" },
      { label: t("experience"), href: "/works" },
      { label: t("education"), href: "/education" },
      { label: t("contact"), href: "/contact" },
    ],
  };

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 py-8">
          <div className="flex flex-col gap-4 sm:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold w-fit transition-opacity hover:opacity-80"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
                <Code2 className="h-4 w-4" />
              </span>
              Emmanuel Cruz
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              {t("description")}
            </p>

            <SocialLinksItem />
          </div>

          <div className="sm:col-span-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("title1")}
            </p>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.portfolio.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("title2")}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("available")}
                </span>
              </div>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-fit gap-1.5"
              >
                <a href="mailto:emmanuelgerr@gmail.com">
                  {t("talkToMe")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-center py-6">
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
