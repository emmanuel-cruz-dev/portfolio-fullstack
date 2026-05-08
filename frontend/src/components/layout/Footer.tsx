import { useTranslations } from "next-intl";
import { Code2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui";
import SocialLinksItem from "@/components/shared/SocialLinksItem";

function Footer() {
  const t = useTranslations("layout.footer");

  const FOOTER_LINKS = [
    { label: t("home"), href: "/" },
    { label: t("projects"), href: "/projects" },
    { label: t("experience"), href: "/works" },
    { label: t("education"), href: "/education" },
    { label: t("contact"), href: "/contact" },
  ];

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
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:flex-row lg:flex-col">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
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
            <p className="text-sm text-muted-foreground w-4/6">
              {t("contactText")}
            </p>
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
