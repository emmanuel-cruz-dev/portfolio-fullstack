const DAY_MS = 1000 * 60 * 60 * 24;

export function getExperienceYears(now: Date) {
  const startDate = new Date(2025, 1, 1);

  let years = now.getFullYear() - startDate.getFullYear();

  const hasCompletedYear =
    now.getMonth() > startDate.getMonth() ||
    (now.getMonth() === startDate.getMonth() &&
      now.getDate() >= startDate.getDate());

  if (!hasCompletedYear) {
    years--;
  }

  return Math.max(years, 0);
}

export function getEstimatedCommits(now: Date) {
  const initialCommits = 11200;
  const initialDate = new Date(2026, 10, 1);

  const daysElapsed = Math.floor(
    (now.getTime() - initialDate.getTime()) / DAY_MS
  );
  const weeksElapsed = Math.max(Math.floor(daysElapsed / 7), 0);

  return initialCommits + weeksElapsed * 100;
}
