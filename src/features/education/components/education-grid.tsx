import { useTranslations } from "next-intl";

import { EducationCard } from "./education-card";
import type { Education } from "../types";
import { PaginationControl } from "@/shared";

export function EducationGrid({
  education,
  totalPages,
}: {
  education: Education[];
  totalPages: number;
}) {
  const t = useTranslations("education");

  if (education.length === 0) {
    return (
      <article className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-muted-foreground/25 bg-card/30">
        <p className="text-muted-foreground text-base max-w-md font-medium">
          {t("empty")}
        </p>
      </article>
    );
  }

  return (
    <main className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((item) => (
          <EducationCard key={item.id} item={item} />
        ))}
      </section>

      <PaginationControl totalPages={totalPages} />
    </main>
  );
}
