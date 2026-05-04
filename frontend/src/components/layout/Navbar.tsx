"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Code2 } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/projects" },
  { label: "Experiencia", href: "/works" },
  { label: "Formación", href: "/education" },
];

function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
            <Code2 className="h-4 w-4" />
          </span>
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
            <Button asChild size="sm" variant="outline">
              <Link href="/contact">Contacto</Link>
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
              <div className="px-2">
                <Button asChild className="w-full" size="sm">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Contacto
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

export default Navbar;
