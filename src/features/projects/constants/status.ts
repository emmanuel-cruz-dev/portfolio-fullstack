import { CheckCircle, PlayCircle, Clock, Archive } from "lucide-react";

import type { Project } from "../types";

export const STATUS_STYLE = {
  COMPLETED: { icon: CheckCircle, variant: "default" },
  IN_PROGRESS: { icon: PlayCircle, variant: "secondary" },
  PLANNED: { icon: Clock, variant: "outline" },
  ARCHIVED: { icon: Archive, variant: "destructive" },
} as const satisfies Record<
  Project["status"],
  { icon: unknown; variant: string }
>;
