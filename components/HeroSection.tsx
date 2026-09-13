"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltersModal from "@/components/FiltersModal";
import { useTranslation } from "@/context/LanguageContext";

type Category = "all" | "house" | "apartment" | "villa" | "penthouse";

const CATEGORIES: { value: string; key: Category }[] = [
  { value: "All", key: "all" },
  { value: "House", key: "house" },
  { value: "Apartment", key: "apartment" },
  { value: "Villa", key: "villa" },
  { value: "Penthouse", key: "penthouse" },
];

export default function HeroSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const currentCategory = searchParams.get("category") || "All";

  const hasActiveFilters = Boolean(
    searchParams.get("minPrice") ||
      searchParams.get("maxPrice") ||
      searchParams.get("beds") ||
      searchParams.get("baths") ||
      searchParams.get("amenities") ||
      (searchParams.get("category") && searchParams.get("category") !== "All")
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    else params.delete("q");

    startTransition(() => {
      const qs = params.toString();
      router.replace(qs ? `/?${qs}` : "/");
    });
  };

  const handleCategoryClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (value === "All") params.delete("category");
    else params.set("category", value);

    startTransition(() => {
      const qs = params.toString();
      router.replace(qs ? `/?${qs}` : "/");
    });
  };

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
            {t("hero.titlePrefix")} {" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium">{t("hero.titleHighlight")}</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
            </span>
            .
          </h1>

          <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">search</span>
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-28 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg outline-none"
              placeholder={t("hero.searchPlaceholder")}
              type="text"
            />
            <button type="submit" className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20 cursor-pointer">
              {t("hero.searchButton")}
            </button>
          </form>

          <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
            {CATEGORIES.map(({ value, key }) => {
              const isSelected = (value === "All" && (!currentCategory || currentCategory === "All")) || currentCategory === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleCategoryClick(value)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${isSelected ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 -translate-y-0.5" : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"}`}
                >
                  {t(`hero.categories.${key}`)}
                </button>
              );
            })}

            <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className={`whitespace-nowrap relative flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all cursor-pointer ${hasActiveFilters ? "bg-mosque/10 text-mosque border border-mosque/30 shadow-sm" : "text-nordic-dark hover:bg-black/5"}`}
            >
              <span className="material-icons text-base">tune</span>
              {t("hero.filters")}
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-mosque animate-pulse"></span>}
            </button>
          </div>
        </div>
      </section>

      <FiltersModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </>
  );
}
