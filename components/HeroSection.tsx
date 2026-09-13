"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltersModal from "@/components/FiltersModal";

const CATEGORIES = ["All", "House", "Apartment", "Villa", "Penthouse"];

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const currentCategory = searchParams.get("category") || "All";

  // Check if any advanced filters are active
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
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // reset pagination on new search
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }

    startTransition(() => {
      const qs = params.toString();
      router.replace(qs ? `/?${qs}` : "/");
    });
  };

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }

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
            Find your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium">sanctuary</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
            </span>
            .
          </h1>

          <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">
                search
              </span>
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-28 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg outline-none"
              placeholder="Search by city, neighborhood, or address..."
              type="text"
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20 cursor-pointer"
            >
              Search
            </button>
          </form>

          <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
            {CATEGORIES.map((cat) => {
              const isSelected =
                (cat === "All" && (!currentCategory || currentCategory === "All")) ||
                currentCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 -translate-y-0.5"
                      : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>

            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className={`whitespace-nowrap relative flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all cursor-pointer ${
                hasActiveFilters
                  ? "bg-mosque/10 text-mosque border border-mosque/30 shadow-sm"
                  : "text-nordic-dark hover:bg-black/5"
              }`}
            >
              <span className="material-icons text-base">tune</span>
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-mosque animate-pulse"></span>
              )}
            </button>
          </div>
        </div>
      </section>

      <FiltersModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}
