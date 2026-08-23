import { useTranslations } from "next-intl";

import { NumberTicker } from "@/components";

interface Stat {
  prefix: string;
  value: number;
  label: string;
}

export function StatsSection() {
  const t = useTranslations("shared.statsSection");

  const stats: Stat[] = [
    { prefix: "+", value: 2, label: t("experience") },
    { prefix: "+", value: 60, label: t("certifications") },
    { prefix: "+", value: 15, label: t("projects") },
    { prefix: "+", value: 8500, label: t("commits") },
  ];

  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-slate-100 dark:bg-slate-900/80 px-6 py-8 shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-border md:divide-x-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center justify-center gap-2 px-4 py-6 text-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-none whitespace-nowrap">
                <span>{stat.prefix}</span>
                <NumberTicker
                  value={stat.value}
                  className="font-bold text-foreground! tracking-tight"
                />
              </p>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
