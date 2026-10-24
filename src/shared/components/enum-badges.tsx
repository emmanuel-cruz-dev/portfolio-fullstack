import { Clock } from "lucide-react";

import { cn } from "@/lib";
import { Badge } from "@/components";
import { STATUS_STYLE } from "../constants";
import { useEnumLabels } from "../hooks/use-enum-labels";
import type { Enums } from "@/types";

interface StatusBadgeProps {
  status: Enums<"project_status">;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const labels = useEnumLabels();
  const { icon: Icon, variant } = STATUS_STYLE[status] || {
    icon: Clock,
    variant: "outline",
  };

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

interface TypeBadgeProps {
  type:
    | Enums<"project_type">
    | Enums<"education_type">
    | Enums<"experience_type">;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

export function TypeBadge({
  type,
  variant = "outline",
  className,
}: TypeBadgeProps) {
  const labels = useEnumLabels();

  return (
    <Badge variant={variant} className={className}>
      {labels.type(type)}
    </Badge>
  );
}

interface BadgeListProps {
  items: string[];
  max?: number;
  variant?: "default" | "secondary" | "outline" | "destructive";
  format?: (v: string) => string;
  className?: string;
}

export function BadgeList({
  items,
  max,
  variant = "secondary",
  format = (v) => v,
  className,
}: BadgeListProps) {
  const visible = max ? items.slice(0, max) : items;
  const hidden = items.length - visible.length;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
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
