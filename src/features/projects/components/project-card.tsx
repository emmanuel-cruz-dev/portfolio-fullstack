import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, FolderGit2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { CardContent } from "@/components";
import {
  BadgeList,
  CardLinks,
  ContentCard,
  ContentCardFooter,
  StatusBadge,
  TypeBadge,
  useEnumLabels,
} from "@/shared";
import { Project } from "../types";

export function ProjectCard({ item }: { item: Project }) {
  const t = useTranslations("projects");
  const labels = useEnumLabels();
  const cover = item.images?.[0];

  return (
    <ContentCard className="group has-[h3_a:focus-visible]:ring-2 has-[h3_a:focus-visible]:ring-ring/50">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={cover}
            alt={item.title}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <FolderGit2 className="size-10 text-muted-foreground/50" />
          </div>
        )}
        <StatusBadge status={item.status} className="absolute top-3 right-3" />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-6">
        <TypeBadge type={item.type} />

        <h3 className="text-lg font-bold leading-snug tracking-tight">
          <Link
            href={`/projects/${item.slug}`}
            className="outline-none transition-colors after:absolute after:inset-0 group-hover:text-primary"
          >
            {item.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <BadgeList
          items={item.areas}
          max={3}
          variant="secondary"
          format={labels.area}
        />
        <BadgeList items={item.technologies} max={8} variant="outline" />
      </CardContent>

      <ContentCardFooter>
        <CardLinks
          githubUrl={item.github_url}
          demoUrl={item.demo_url}
          githubLabel={t("card.github")}
          demoLabel={t("card.demo")}
        />
        <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          {t("card.viewDetails")}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </ContentCardFooter>
    </ContentCard>
  );
}
