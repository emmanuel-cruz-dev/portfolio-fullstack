import { cn } from "@/lib";
import { Badge } from "@/components";
import { STATUS_STYLE } from "../constants";
import { useProjectLabels } from "../hooks/use-project-labels";
import type { Project } from "../types";

export function StatusBadge({
  status,
  className,
}: {
  status: Project["status"];
  className?: string;
}) {
  const labels = useProjectLabels();
  const { icon: Icon, variant } = STATUS_STYLE[status];

  return (
    <Badge
      variant={variant}
      className={cn("flex items-center gap-1.5", className)}
    >
      <Icon className="h-3 w-3" />
      {labels.status(status)}
    </Badge>
  );
}

export function TypeBadge({ type }: { type: Project["type"] }) {
  const labels = useProjectLabels();

  return <Badge variant="outline">{labels.type(type)}</Badge>;
}

export function BadgeList({
  items,
  max,
  variant = "secondary",
  format = (v) => v,
}: {
  items: string[];
  max?: number;
  variant?: "secondary" | "outline";
  format?: (v: string) => string;
}) {
  const visible = max ? items.slice(0, max) : items;
  const hidden = items.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((i) => (
        <Badge
          key={i}
          variant={variant}
          className="text-xs bg-white dark:bg-secondary"
        >
          {format(i)}
        </Badge>
      ))}
      {hidden > 0 && (
        <Badge variant={variant} className="text-xs bg-white dark:bg-secondary">
          +{hidden}
        </Badge>
      )}
    </div>
  );
}
