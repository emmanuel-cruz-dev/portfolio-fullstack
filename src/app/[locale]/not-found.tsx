import { getTranslations } from "next-intl/server";
import {
  Home,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Mail,
  Search,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components";
import { BackButton } from "@/shared";

async function NotFound() {
  const t = await getTranslations("app.notFound");

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <article className="max-w-2xl w-full text-center space-y-8">
        <figure className="w-fit p-4 bg-muted rounded-full border border-border mx-auto">
          <Search className="text-4xl" />
        </figure>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {t("title")}
        </h1>

        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          {t("description")}
        </p>

        <div className="flex justify-center gap-4 w-fit mx-auto">
          <Button
            asChild
            className="btn-brand-cta h-12 w-full xs:w-fit xs:px-12 xl:px-16!"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              {t("action")}
            </Link>
          </Button>
          <BackButton />
        </div>

        <footer className="pt-8 border-t border-border/60">
          <p className="text-sm text-muted-foreground mb-4">
            {t("sections.title")}
          </p>
          <nav className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              {t("sections.home")}
            </Link>
            <Link
              href="/education"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {t("sections.education")}
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Briefcase className="h-3.5 w-3.5" />
              {t("sections.experience")}
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <FolderOpen className="h-3.5 w-3.5" />
              {t("sections.projects")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {t("sections.contact")}
            </Link>
          </nav>
        </footer>
      </article>
    </main>
  );
}

export default NotFound;
