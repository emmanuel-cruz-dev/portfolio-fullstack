"use client";

import { useTranslations } from "next-intl";
import { Filter, RotateCcw, GraduationCap, Layers } from "lucide-react";

import {
  Button,
  Badge,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  Label,
} from "@/components";
import { EducationSearch } from "./education-search";
import { FilterBadgeList, useEnumLabels } from "@/shared";
import { useEducationFilters } from "../hooks";
import { Constants } from "@/types";

const TYPES = Constants.public.Enums.education_type;
const AREAS = Constants.public.Enums.education_area;

export function EducationFilters() {
  const t = useTranslations("education");
  const labels = useEnumLabels();

  const {
    currentSearch,
    currentType,
    currentArea,
    currentFeatured,
    hasActiveFilters,
    activeCount,
    isPending,
    updateFilter,
    handleClearAll,
  } = useEducationFilters();

  const renderHeader = (iconClassName = "text-brand-accent") => (
    <div className="flex items-center justify-between mb-4 min-h-7">
      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Filter className={`h-4 w-4 ${iconClassName}`} />
        {t("sidebar.title")}
      </p>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1.5 cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          {t("sidebar.clearFilters")}
        </Button>
      )}
    </div>
  );

  const controls = (
    <div
      className={`space-y-6 ${
        isPending ? "opacity-70 transition-opacity" : ""
      }`}
    >
      <EducationSearch
        value={currentSearch}
        isPending={isPending}
        onSearch={(term) => updateFilter("q", term)}
      />

      <div className="flex items-center gap-2">
        <Switch
          id="featured-switch"
          checked={!!currentFeatured}
          className="cursor-pointer"
          onCheckedChange={(checked) =>
            updateFilter("featured", checked ? "true" : null)
          }
        />
        <Label
          htmlFor="featured-switch"
          className="flex items-center gap-2 text-xs font-medium cursor-pointer"
        >
          {t("sidebar.featuredLabel")}
        </Label>
      </div>

      <div className="space-y-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider">
          <GraduationCap className="h-3.5 w-3.5 text-brand-accent" />
          {t("sidebar.typeLabel")}
        </p>

        <FilterBadgeList
          items={TYPES}
          selected={currentType}
          onSelect={(value) => updateFilter("type", value)}
          allLabel={t("sidebar.allTypes")}
          format={labels.type}
        />
      </div>

      <div className="space-y-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5 text-cyan-400" />
          {t("sidebar.areaLabel")}
        </p>

        <FilterBadgeList
          items={AREAS}
          selected={currentArea}
          onSelect={(value) => updateFilter("area", value)}
          allLabel={t("sidebar.allAreas")}
          format={labels.area}
          tone="accent"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs font-medium cursor-pointer"
            >
              <Filter className="h-3.5 w-3.5" />
              {t("sidebar.filterButton")}
              {activeCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 px-1.5 text-[10px]"
                >
                  {activeCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-75 sm:w-90 p-6 overflow-y-auto"
          >
            <SheetHeader className="mb-6 px-0 text-left">
              <SheetTitle asChild>{renderHeader("text-foreground")}</SheetTitle>
            </SheetHeader>
            {controls}
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden lg:block w-76 shrink-0 space-y-6">
        <div className="sticky top-24 p-5 rounded-xl border bg-card/40 backdrop-blur-sm shadow-xs">
          {renderHeader()}
          {controls}
        </div>
      </aside>
    </>
  );
}
