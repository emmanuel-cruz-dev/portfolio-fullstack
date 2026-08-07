import { Skeleton } from "@/components";

export function FeaturedSectionSkeleton() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-background text-foreground border-t border-border/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-4 text-center flex flex-col items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-96" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-72">
          <Skeleton className="rounded-xl" />
          <Skeleton className="rounded-xl hidden md:block" />
          <Skeleton className="rounded-xl hidden md:block" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-40 mx-auto" />
      </div>
    </section>
  );
}
