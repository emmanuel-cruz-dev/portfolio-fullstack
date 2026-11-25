import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useEducationFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("q") ?? "";
  const currentType = searchParams.get("type");
  const currentArea = searchParams.get("area");
  const currentFeatured = searchParams.get("featured") === "true";

  const activeCount = [
    currentSearch,
    currentType,
    currentArea,
    currentFeatured,
  ].filter(Boolean).length;

  const hasActiveFilters = activeCount > 0;

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.push(url, { scroll: false });
    });
  }

  function handleClearAll() {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }

  return {
    currentSearch,
    currentType,
    currentArea,
    currentFeatured,
    hasActiveFilters,
    activeCount,
    isPending,
    updateFilter,
    handleClearAll,
  };
}
