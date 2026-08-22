import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ExternalLink,
  CheckCircle,
  Clock,
  Archive,
  PlayCircle,
  Eye,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  Badge,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";
import { Project } from "../types";

type StatusVariant = "default" | "secondary" | "outline" | "destructive";

export function ProjectCard({ item }: { item: Project }) {
  const t = useTranslations("projects");

  const typeLabels = {
    PERSONAL: t("types.personal"),
    FREELANCE: t("types.freelance"),
    ACADEMIC: t("types.academic"),
    COLLABORATIVE: t("types.collaborative"),
    OPEN_SOURCE: t("types.openSource"),
  };

  const statusConfig = {
    COMPLETED: {
      label: t("status.completed"),
      icon: CheckCircle,
      variant: "default",
    },
    IN_PROGRESS: {
      label: t("status.inProgress"),
      icon: PlayCircle,
      variant: "secondary",
    },
    PLANNED: { label: t("status.planned"), icon: Clock, variant: "outline" },
    ARCHIVED: {
      label: t("status.archived"),
      icon: Archive,
      variant: "destructive",
    },
  };

  const StatusIcon = statusConfig[item.status].icon;

  return (
    <article className="group relative rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Thumbnail */}
      <Link
        href={`/projects/${item.slug}`}
        className="block relative w-full aspect-video overflow-hidden bg-muted"
        aria-label="View project details"
        title={t("projectCard.viewDetails")}
      >
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 480px, 100vw"
          priority
        />
        <Badge
          variant={statusConfig[item.status].variant as StatusVariant}
          className="absolute top-3 right-3 flex items-center gap-1.5"
        >
          <StatusIcon className="h-3 w-3" />
          {statusConfig[item.status].label}
        </Badge>
      </Link>

      <div className="p-6 space-y-3 flex-1 flex flex-col">
        {/* Type Badge */}
        <Badge variant="outline" className="mb-1">
          {typeLabels[item.type] || item.type}
        </Badge>

        {/* Title */}
        <Link
          href={`/projects/${item.slug}`}
          className="hover:text-primary transition-colors"
          aria-label="View project details"
          title={t("projectCard.viewDetails")}
        >
          <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
        </Link>

        {/* Description */}
        <p className="text-left text-sm text-muted-foreground line-clamp-3">
          {item.description}
        </p>

        {/* Areas */}
        <div className="flex flex-wrap gap-1.5">
          {item.areas.slice(0, 3).map((area) => (
            <Badge key={area} variant="secondary" className="text-xs">
              {area.replace("_", " ")}
            </Badge>
          ))}
          {item.areas.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{item.areas.length - 3}
            </Badge>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {item.technologies.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{item.technologies.length - 5}
            </Badge>
          )}
        </div>

        {/* Actions */}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{t("projectCard.github")}</p>
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
                  <p>{t("projectCard.demo")}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Link href={`/projects/${item.slug}`}>
            <Button variant="ghost" size="sm" className="gap-1 cursor-pointer">
              {t("projectCard.viewDetails")}
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
