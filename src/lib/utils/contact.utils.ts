import { RATE_LIMIT_KEY, MAX_PER_DAY } from "@/constants";

export function checkRateLimit(): boolean {
  if (typeof window === "undefined") return true;

  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const today = new Date().toDateString();
    if (!raw) return true;
    const data: { date: string; count: number } = JSON.parse(raw);
    if (data.date !== today) return true;
    return data.count < MAX_PER_DAY;
  } catch {
    return true;
  }
}

export function incrementRateLimit() {
  if (typeof window === "undefined") return;

  const raw = localStorage.getItem(RATE_LIMIT_KEY);
  const today = new Date().toDateString();

  if (!raw || JSON.parse(raw).date !== today) {
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ date: today, count: 1 })
    );
  } else {
    const data = JSON.parse(raw);
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ date: today, count: data.count + 1 })
    );
  }
}
