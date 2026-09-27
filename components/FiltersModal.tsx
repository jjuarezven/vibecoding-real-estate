"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/context/LanguageContext";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMENITY_OPTIONS = [
  { id: "pool", label: "swimmingPool", icon: "pool" },
  { id: "gym", label: "gym", icon: "fitness_center" },
  { id: "parking", label: "parking", icon: "local_parking" },
  { id: "ac", label: "airConditioning", icon: "ac_unit" },
  { id: "wifi", label: "wifi", icon: "wifi" },
  { id: "terrace", label: "patioTerrace", icon: "deck" },
];

const MIN_LIMIT = 0;
const MAX_LIMIT = 10000000;

export default function FiltersModal({ isOpen, onClose }: FiltersModalProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Local state initialized from current URL searchParams
  const [location, setLocation] = useState(searchParams.get("q") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("category") || ""
  );
  const [minPrice, setMinPrice] = useState<number>(() => {
    const val = searchParams.get("minPrice");
    return val ? Number(val) : 0;
  });
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const val = searchParams.get("maxPrice");
    return val ? Number(val) : 10000000;
  });
  const [beds, setBeds] = useState<number>(() => {
    const val = searchParams.get("beds");
    return val ? Number(val) : 0;
  });
  const [baths, setBaths] = useState<number>(() => {
    const val = searchParams.get("baths");
    return val ? Number(val) : 0;
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(() => {
    const val = searchParams.get("amenities");
    return val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
  });

  const [matchingCount, setMatchingCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setLocation(searchParams.get("q") || "");
      setPropertyType(searchParams.get("category") || "");
      const minP = searchParams.get("minPrice");
      setMinPrice(minP ? Number(minP) : 0);
      const maxP = searchParams.get("maxPrice");
      setMaxPrice(maxP ? Number(maxP) : 10000000);
      const b = searchParams.get("beds");
      setBeds(b ? Number(b) : 0);
      const ba = searchParams.get("baths");
      setBaths(ba ? Number(ba) : 0);
      const am = searchParams.get("amenities");
      setSelectedAmenities(
        am ? am.split(",").map((s) => s.trim()).filter(Boolean) : []
      );
    }
  }, [isOpen, searchParams]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Fetch live count with debounce
  const fetchCount = useCallback(async () => {
    setIsLoadingCount(true);
    try {
      const params = new URLSearchParams();
      if (location.trim()) params.set("q", location.trim());
      if (propertyType && propertyType !== "Any Type") {
        params.set("category", propertyType);
      }
      if (minPrice > 0) params.set("minPrice", minPrice.toString());
      if (maxPrice < 10000000) params.set("maxPrice", maxPrice.toString());
      if (beds > 0) params.set("beds", beds.toString());
      if (baths > 0) params.set("baths", baths.toString());
      if (selectedAmenities.length > 0) {
        params.set("amenities", selectedAmenities.join(","));
      }

      const res = await fetch(`/api/count?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMatchingCount(data.count);
      }
    } catch {
      // ignore error
    } finally {
      setIsLoadingCount(false);
    }
  }, [location, propertyType, minPrice, maxPrice, beds, baths, selectedAmenities]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      fetchCount();
    }, 250);
    return () => clearTimeout(timer);
  }, [isOpen, fetchCount]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleClear = () => {
    setLocation("");
    setPropertyType("");
    setMinPrice(0);
    setMaxPrice(10000000);
    setBeds(0);
    setBaths(0);
    setSelectedAmenities([]);

    startTransition(() => {
      router.replace("/");
      onClose();
    });
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (propertyType && propertyType !== "Any Type") {
      params.set("category", propertyType);
    }
    if (minPrice > 0) params.set("minPrice", minPrice.toString());
    if (maxPrice < 10000000) params.set("maxPrice", maxPrice.toString());
    if (beds > 0) params.set("beds", beds.toString());
    if (baths > 0) params.set("baths", baths.toString());
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","));
    }

    startTransition(() => {
      const qs = params.toString();
      router.replace(qs ? `/?${qs}` : "/");
      onClose();
    });
  };

  if (!isOpen) return null;

  // Format price string for header
  const formatPriceDisplay = () => {
    const fmt = (num: number) => {
      if (num >= 1000000) {
        const m = num / 1000000;
        return `$${m % 1 === 0 ? m : m.toFixed(1)}M`;
      }
      if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
      }
      return `$${num.toLocaleString()}`;
    };
    return `${fmt(minPrice)} – ${fmt(maxPrice)}`;
  };

  // Slider percent calculations
  const minPercent = Math.min(
    100,
    Math.max(0, ((minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100)
  );
  const maxPercent = Math.min(
    100,
    Math.max(0, ((maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <main className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-30">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("filtersModal.title")}
          </h1>
          <button
            onClick={onClose}
            aria-label={t("filtersModal.close")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
          >
            <span className="material-icons">close</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10">
          {/* Section 1: Location */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {t("filtersModal.location")}
            </label>
            <div className="relative group">
              <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-mosque transition-colors pointer-events-none">
                location_on
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-background-light dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-mosque focus:bg-white dark:focus:bg-gray-800 transition-all shadow-sm outline-none"
                placeholder={t("filtersModal.locationPlaceholder")}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </section>

          {/* Section 2: Price Range */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t("filtersModal.priceRange")}
              </label>
              <span className="text-sm font-medium text-mosque">
                {formatPriceDisplay()}
              </span>
            </div>

            {/* Custom Dual Slider Visual */}
            <div className="relative h-12 flex items-center mb-6 px-2">
              <div className="absolute w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-mosque transition-all"
                  style={{
                    marginLeft: `${minPercent}%`,
                    width: `${Math.max(0, maxPercent - minPercent)}%`,
                  }}
                />
              </div>

              {/* Range Inputs overlaid */}
              <input
                type="range"
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                step={50000}
                value={minPrice}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxPrice - 50000);
                  setMinPrice(val);
                }}
                className="absolute inset-0 w-full opacity-0 pointer-events-auto cursor-pointer z-20"
                style={{
                  clipPath: `polygon(0 0, ${minPercent + 5}% 0, ${minPercent + 5}% 100%, 0 100%)`,
                }}
              />
              <input
                type="range"
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                step={50000}
                value={maxPrice}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minPrice + 50000);
                  setMaxPrice(val);
                }}
                className="absolute inset-0 w-full opacity-0 pointer-events-auto cursor-pointer z-20"
                style={{
                  clipPath: `polygon(${minPercent}% 0, 100% 0, 100% 100%, ${minPercent}% 100%)`,
                }}
              />

              {/* Visual Handles */}
              <div
                className="absolute w-6 h-6 bg-white border-2 border-mosque rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform -ml-3 z-10 pointer-events-none"
                style={{ left: `${minPercent}%` }}
              />
              <div
                className="absolute w-6 h-6 bg-white border-2 border-mosque rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform -ml-3 z-10 pointer-events-none"
                style={{ left: `${maxPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-light dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
                  {t("filtersModal.minPrice")}
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm outline-none"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="bg-background-light dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
                  {t("filtersModal.maxPrice")}
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm outline-none"
                    type="number"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(Number(e.target.value) || 10000000)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Type */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t("filtersModal.propertyType")}
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-background-light dark:bg-gray-800 border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-mosque cursor-pointer outline-none"
                >
                  <option value="">{t("filtersModal.anyType")}</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
                <span className="material-icons absolute right-3 top-3 text-gray-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-4">
              {/* Beds */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t("filtersModal.bedrooms")}
                </span>
                <div className="flex items-center space-x-3 bg-background-light dark:bg-gray-800 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setBeds((b) => Math.max(0, b - 1))}
                    disabled={beds === 0}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {beds > 0 ? `${beds}+` : t("filtersModal.any")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBeds((b) => b + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>

              {/* Baths */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t("filtersModal.bathrooms")}
                </span>
                <div className="flex items-center space-x-3 bg-background-light dark:bg-gray-800 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setBaths((b) => Math.max(0, b - 1))}
                    disabled={baths === 0}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {baths > 0 ? `${baths}+` : t("filtersModal.any")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBaths((b) => b + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Amenities & Features */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              {t("filtersModal.amenities")}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITY_OPTIONS.map((item) => {
                const isActive = selectedAmenities.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAmenity(item.id)}
                    className={`relative px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? "border border-mosque bg-mosque/10 text-mosque font-medium"
                        : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`material-icons text-lg ${
                        isActive ? "text-mosque" : "text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {t(`filtersModal.${item.label}`)}
                    {isActive && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-mosque rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors underline decoration-gray-300 underline-offset-4 cursor-pointer"
          >
            {t("filtersModal.clear")}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-mosque/30 transition-all hover:shadow-mosque/40 flex items-center gap-2 transform active:scale-95 cursor-pointer"
          >
            {isLoadingCount
              ? t("filtersModal.searching")
              : matchingCount !== null
              ? `${t("filtersModal.apply")} (${matchingCount})`
              : t("filtersModal.apply")}
            <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </footer>
      </main>
    </div>
  );
}



