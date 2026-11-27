import { Skeleton } from "@/components";

export function CardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="flex flex-col min-h-76 rounded-xl border border-border/50 bg-card/30 backdrop-blur-xs overflow-hidden"
    >
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
          <div className="space-y-2 flex-1 pt-1">
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-4 w-2/5" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full shrink-0" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <Skeleton className="h-7 w-14 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/50 px-6 py-4">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-5 w-28 rounded-md" />
      </div>
    </article>
  );
}
