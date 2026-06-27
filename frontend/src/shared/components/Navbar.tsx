"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, Code2 } from "lucide-react";

import { useIsDarkTheme } from "@/shared";
import { usePathname, Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  Button,
  Separator,
  AnimatedThemeToggler,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components";
import { cn } from "@/lib/utils";

export function Navbar() {
  const isDark = useIsDarkTheme();
  const pathname = usePathname();
  const t = useTranslations("layout.nav");
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: t("home"), href: "/" },
    { label: t("projects"), href: "/projects" },
    { label: t("experience"), href: "/experience" },
    { label: t("education"), href: "/education" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <Image
            src={isDark ? "/e-logo-white.avif" : "/e-logo.avif"}
            className="w-7 h-auto"
            alt="Emmanuel Cruz Logo"
            width={300}
            height={198}
          />
          <span className="hidden sm:inline">Emmanuel Cruz</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map(({ label, href }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    pathname === href && "text-foreground"
                  )}
                >
                  <Link href={href}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <Button asChild size="sm" variant="outline">
              <Link href="/contact">{t("contact")}</Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader className="mb-0 pb-0">
                <SheetTitle className="flex items-center gap-2 text-left text-sm font-semibold">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
                    <Code2 className="h-4 w-4" />
                  </span>
                  Emmanuel Cruz
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <nav className="flex flex-col gap-1 px-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-4" />
              <div className="flex items-center justify-between px-2">
                <LanguageSwitcher />
                <Button asChild className="w-full" size="sm">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    {t("contact")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <AnimatedThemeToggler
            duration={600}
            className="h-9 w-9 rounded-full flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
