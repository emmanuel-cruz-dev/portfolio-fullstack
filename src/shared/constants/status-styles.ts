import { CheckCircle, PlayCircle, Clock, Archive } from "lucide-react";

import type { Enums } from "@/types";

export const STATUS_STYLE: Record<
  Enums<"project_status">,
  {
    icon: React.ComponentType<{ className?: string }>;
    variant: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  COMPLETED: { icon: CheckCircle, variant: "default" },
  IN_PROGRESS: { icon: PlayCircle, variant: "secondary" },
  PLANNED: { icon: Clock, variant: "outline" },
  ARCHIVED: { icon: Archive, variant: "destructive" },
};
