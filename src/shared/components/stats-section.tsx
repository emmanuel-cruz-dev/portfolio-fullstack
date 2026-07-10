import { useTranslations } from "next-intl";

import { NumberTicker } from "../../components/ui/number-ticker";

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
      <div className="max-w-6xl mx-auto rounded-2xl border border-slate-200 bg-[#eef2f7] px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                <span>{stat.prefix}</span>
                <NumberTicker
                  value={stat.value}
                  className="font-bold text-slate-900! tracking-tight"
                />
              </p>
              <span className="text-sm text-slate-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
