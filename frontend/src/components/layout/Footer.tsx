"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { useIsDarkTheme } from "@/hooks";
import { Link } from "@/i18n/navigation";
import { Separator, SpinningText } from "@/components/ui";
import SocialLinksItem from "@/components/shared/SocialLinksItem";

function Footer() {
  const isDark = useIsDarkTheme();
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
              <Image
                src={isDark ? "/e-logo-white.avif" : "/e-logo.avif"}
                className="w-7 h-auto"
                alt="Emmanuel Cruz Logo"
                width={300}
                height={198}
              />
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
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
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
            <article className="h-full flex justify-center">
              <SpinningText>{t("spinningText")}</SpinningText>
            </article>
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
