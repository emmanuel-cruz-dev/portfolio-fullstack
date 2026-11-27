import { CardSkeleton } from "@/shared";

function ExperienceLoading() {
  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}

export default ExperienceLoading;
