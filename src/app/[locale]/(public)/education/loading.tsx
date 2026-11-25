import { Skeleton } from "@/components";

function EducationLoading() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col h-72 rounded-xl border border-border/50 p-6 space-y-4 bg-card/30 backdrop-blur-xs"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>

            <div className="space-y-2 flex-1 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>

            <div className="flex gap-2 pt-2">
              <Skeleton className="h-5 w-16 rounded" />
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-14 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationLoading;
