import { Locale } from "@/shared";

export function formatMonthYear(
  date: Date | undefined,
  locale: Locale
): string {
  if (!date) return "";

  const localeTag = locale === "en" ? "en-US" : "es-ES";
  const raw = date.toLocaleDateString(localeTag, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });

  if (locale === "es") {
    const withoutDe = raw.replace(" de ", " ");
    return withoutDe.charAt(0).toUpperCase() + withoutDe.slice(1);
  }

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function formatDateRange(
  start: string,
  end: string | null | undefined,
  presentLabel: string,
  locale: Locale
) {
  const from = formatMonthYear(new Date(start), locale);
  const to = end ? formatMonthYear(new Date(end), locale) : presentLabel;
  return `${from} - ${to}`;
}
