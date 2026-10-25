import * as React from "react";

import { Card, CardFooter } from "@/components";
import { cn } from "@/lib/utils";

export function ContentCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "relative h-full gap-0 overflow-hidden py-0",
        "border-border/60 bg-sky-50/70 dark:bg-card",
        "transition-[box-shadow,border-color] duration-300",
        "hover:border-primary/20 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

export function ContentCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return (
    <CardFooter
      className={cn(
        "mt-auto justify-between gap-3 border-t border-border/40",
        "bg-sky-100/50 py-4! dark:bg-muted/10",
        className
      )}
      {...props}
    />
  );
}
