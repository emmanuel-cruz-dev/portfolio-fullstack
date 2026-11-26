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
    <Badge
      variant={variant}
      className={cn("bg-white dark:bg-secondary/30", className)}
    >
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

const FILTER_TONE_STYLES = {
  primary: {
    all: "px-2.5 py-1 text-xs justify-start",
    item: "px-2.5 py-1 text-xs justify-start",
    active: "bg-primary text-primary-foreground",
    inactive: "hover:border-primary/50",
  },
  accent: {
    all: "px-2.5 py-1 text-xs",
    item: "px-2 py-1 text-[11px]",
    active: "bg-brand-accent text-brand-accent-foreground",
    inactive: "hover:border-brand-accent/50",
  },
} as const;

interface FilterBadgeListProps<T extends string> {
  items: readonly T[];
  selected?: T | string | null;
  onSelect: (value: T | null) => void;
  allLabel?: string;
  format?: (v: T) => string;
  tone?: keyof typeof FILTER_TONE_STYLES;
  className?: string;
  badgeClassName?: string;
}

export function FilterBadgeList<T extends string>({
  items,
  selected,
  onSelect,
  allLabel,
  format = (v) => v,
  tone = "primary",
  className,
  badgeClassName,
}: FilterBadgeListProps<T>) {
  const styles = FILTER_TONE_STYLES[tone];

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {allLabel && (
        <Badge
          variant={!selected ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-colors",
            styles.all,
            badgeClassName
          )}
          onClick={() => onSelect(null)}
        >
          {allLabel}
        </Badge>
      )}

      {items.map((item) => {
        const isActive = selected === item;
        return (
          <Badge
            key={item}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors",
              styles.item,
              isActive ? styles.active : styles.inactive,
              badgeClassName
            )}
            onClick={() => onSelect(isActive ? null : item)}
          >
            {format(item)}
          </Badge>
        );
      })}
    </div>
  );
}
