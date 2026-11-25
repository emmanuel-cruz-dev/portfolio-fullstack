export function normalizeSearchTerm(search: string): string {
  return search.trim().replace(/\s+/g, " ");
}

export function escapeIlike(value: string): string {
  return value.replace(/[%_]/g, (char) => `\\${char}`);
}
