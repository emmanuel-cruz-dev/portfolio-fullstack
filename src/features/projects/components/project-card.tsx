import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  GithubIcon,
} from "@/components";
import { StatusBadge, TypeBadge, BadgeList, useEnumLabels } from "@/shared";
import { Project } from "../types";

export function ProjectCard({ item }: { item: Project }) {
  const t = useTranslations("projects");
  const labels = useEnumLabels();

  return (
    <article className="group relative rounded-xl border border-border bg-sky-50/70 dark:bg-card hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      <Link
        href={`/projects/${item.slug}`}
        className="block relative w-full aspect-video overflow-hidden bg-muted"
        aria-label="View project details"
        title={t("card.viewDetails")}
      >
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 480px, 100vw"
        />
        <StatusBadge status={item.status} className="absolute top-3 right-3" />
      </Link>

      <div className="p-6 space-y-3 flex-1 flex flex-col">
        <TypeBadge type={item.type} />

        <Link
          href={`/projects/${item.slug}`}
          className="hover:text-primary transition-colors"
          aria-label="View project details"
          title={t("card.viewDetails")}
        >
          <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
        </Link>

        <p className="text-left text-sm text-muted-foreground line-clamp-3">
          {item.description}
        </p>

        <BadgeList
          items={item.areas}
          max={3}
          variant="secondary"
          format={labels.area}
        />

        <BadgeList items={item.technologies} max={8} variant="outline" />

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex gap-3">
            {item.github_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{t("card.github")}</p>
                </TooltipContent>
              </Tooltip>
            )}
            {item.demo_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Demo"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{t("card.demo")}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Button asChild variant="ghost" size="sm" className="group/button">
            <Link href={`/projects/${item.slug}`}>
              {t("card.viewDetails")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
