import { getTranslations } from "next-intl/server";
import { ArrowLeft, FolderX } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components";

export async function ProjectNotFound({ slug }: { slug: string }) {
  const t = await getTranslations("projects.notFound");

  return (
    <article className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
      <figure className="p-4 bg-muted rounded-full border border-border mb-6">
        <FolderX className="h-10 w-10 text-muted-foreground" />
      </figure>

      <h1 className="text-3xl font-extrabold tracking-tight mb-3 md:text-4xl">
        {t("title")}
      </h1>

      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        {t("description")}{" "}
        <code className="px-1.5 py-0.5 bg-muted rounded border border-border text-xs font-mono text-foreground">
          {slug}
        </code>{" "}
        {t("suffix")}
      </p>

      <Button
        asChild
        variant="outline"
        className="cursor-pointer shadow-sm px-12! xl:px-16! h-12 font-bold group"
      >
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t("action")}
        </Link>
      </Button>
    </article>
  );
}
