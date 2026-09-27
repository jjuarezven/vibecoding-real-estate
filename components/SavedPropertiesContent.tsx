"use client";

import Link from "next/link";
import { useMemo } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useTranslation } from "@/context/LanguageContext";
import type { Property } from "@/data/mockProperties";

export default function SavedPropertiesContent({ properties }: { properties: Property[] }) {
  const { favoriteIds, hydrated } = useFavorites();
  const { t } = useTranslation();
  const favorites = useMemo(() => {
    const saved = new Set(favoriteIds);
    return properties.filter((property) => saved.has(property.id));
  }, [favoriteIds, properties]);

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-2xl bg-white" aria-label={t("favorites.loading")} />;
  }

  if (favorites.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-nordic-dark/5 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mosque/10 text-mosque">
          <span className="material-icons text-3xl">favorite_border</span>
        </div>
        <h2 className="text-lg font-medium text-nordic-dark">{t("favorites.emptyTitle")}</h2>
        <p className="text-sm text-nordic-muted">{t("favorites.emptyDescription")}</p>
        <Link href="/" className="inline-flex rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-mosque/90">
          {t("favorites.explore")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favorites.map((property) => <PropertyCard key={property.id} property={property} />)}
    </div>
  );
}
