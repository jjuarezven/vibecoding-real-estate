"use client";

import Link from "next/link";
import FeaturedCard from "@/components/FeaturedCard";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { useTranslation } from "@/context/LanguageContext";
import { Property } from "@/data/mockProperties";

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  hasAnyFilter: boolean;
  featuredProperties: Property[];
  newMarketProperties: Property[];
  count: number;
  type?: string;
  totalPages: number;
  page: number;
  searchParams: SearchParams;
};

export default function HomeContent({
  hasAnyFilter,
  featuredProperties,
  newMarketProperties,
  count,
  type,
  totalPages,
  page,
  searchParams,
}: Props) {
  const { t } = useTranslation();
  const plural = count === 1 ? t("home.propertySingular") : t("home.propertyPlural");

  const buildTypeUrl = (newType?: string) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && key !== "type" && typeof value === "string") {
        params.set(key, value);
      }
    });
    if (newType) params.set("type", newType);
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <>
      {!hasAnyFilter && (
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">{t("home.featuredTitle")}</h2>
              <p className="text-nordic-muted mt-1 text-sm">{t("home.featuredSubtitle")}</p>
            </div>
            <a className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity" href="#all-properties">
              {t("home.viewAll")} <span className="material-icons text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProperties.map((property) => <FeaturedCard key={property.id} property={property} />)}
          </div>
        </section>
      )}

      <section id="all-properties">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-light text-nordic-dark">{hasAnyFilter ? t("home.searchResults") : t("home.newInMarket")}</h2>
            <p className="text-nordic-muted mt-1 text-sm">
              {hasAnyFilter ? t("home.showingResults", { count, plural }) : t("home.freshOpportunities")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-lg border border-nordic-dark/5 shadow-sm flex">
              <Link href={buildTypeUrl(undefined)} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!type ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}>{t("home.tabAll")}</Link>
              <Link href={buildTypeUrl("SALE")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === "SALE" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}>{t("home.tabBuy")}</Link>
              <Link href={buildTypeUrl("RENT")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === "RENT" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}>{t("home.tabRent")}</Link>
            </div>
            {hasAnyFilter && <Link href="/" className="text-xs font-medium text-nordic-muted hover:text-mosque px-3 py-1.5 rounded-lg border border-nordic-dark/10 bg-white hover:border-mosque transition-all">{t("home.reset")}</Link>}
          </div>
        </div>

        {newMarketProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newMarketProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm border border-nordic-dark/5 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-mosque/10 flex items-center justify-center text-mosque"><span className="material-icons text-3xl">search_off</span></div>
            <h3 className="text-lg font-medium text-nordic-dark">{t("home.noPropertiesTitle")}</h3>
            <p className="text-sm text-nordic-muted">{t("home.noPropertiesDesc")}</p>
            <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mosque text-white text-sm font-medium hover:bg-mosque/90 transition-colors shadow-sm">{t("home.clearAllFilters")}</Link>
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />
      </section>
    </>
  );
}
