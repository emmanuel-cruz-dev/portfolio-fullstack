"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { Loader2, Search, X } from "lucide-react";

import { Input, Button } from "@/components";
import { normalizeSearchTerm } from "@/lib/utils/search.utils";

interface EducationSearchProps {
  value: string;
  isPending: boolean;
  onSearch: (term: string | null) => void;
}

export function EducationSearch({
  value: urlValue,
  isPending,
  onSearch,
}: EducationSearchProps) {
  const t = useTranslations("education");
  const [inputValue, setInputValue] = useState(urlValue);
  const [prevUrlValue, setPrevUrlValue] = useState(urlValue);

  if (urlValue !== prevUrlValue) {
    setPrevUrlValue(urlValue);
    if (normalizeSearchTerm(inputValue) !== urlValue) {
      setInputValue(urlValue);
    }
  }

  const debouncedUpdate = useDebouncedCallback((term: string) => {
    const normalized = term ? normalizeSearchTerm(term) : "";
    onSearch(normalized || null);
  }, 500);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setInputValue(next);
    debouncedUpdate(next);
  }

  function handleClear() {
    debouncedUpdate.cancel();
    setInputValue("");
    onSearch(null);
  }

  return (
    <div className="relative">
      {isPending ? (
        <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      )}
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={t("sidebar.searchPlaceholder")}
        className="pl-8 pr-6 h-9 text-xs"
      />
      {inputValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("sidebar.clearFilters")}
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
