"use client";

import Link from "next/link";
import { Property } from "../data/mockProperties";
import { useTranslation } from "@/context/LanguageContext";

interface FeaturedCardProps {
  property: Property;
}

export default function FeaturedCard({ property }: FeaturedCardProps) {
  const { t } = useTranslation();

  const getTranslatedBadge = (badge?: string) => {
    if (!badge) return null;
    const normalized = badge.trim().toLowerCase();
    if (normalized === "exclusive") return t("badges.exclusive");
    if (normalized === "new arrival") return t("badges.newArrival");
    if (normalized === "design award") return t("badges.designAward");
    return badge;
  };

  return (
    <Link href={`/properties/${property.slug}`} className="block group">
      <div className="relative rounded-xl overflow-hidden shadow-soft bg-white">
        <div className="aspect-[4/3] w-full overflow-hidden relative">
          <img src={property.images[0].url} alt={property.images[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {property.badge && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic-dark">
              {getTranslatedBadge(property.badge)}
            </div>
          )}
          <button type="button" onClick={(event) => event.preventDefault()} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic-dark hover:bg-mosque hover:text-white transition-all">
            <span className="material-icons text-xl">favorite_border</span>
          </button>
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        </div>
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-medium text-nordic-dark group-hover:text-mosque transition-colors">{property.title}</h3>
              <p className="text-nordic-muted text-sm flex items-center gap-1 mt-1"><span className="material-icons text-sm">place</span>{property.location}</p>
            </div>
            <span className="text-xl font-semibold text-mosque">${property.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-nordic-dark/5">
            <div className="flex items-center gap-2 text-nordic-muted text-sm"><span className="material-icons text-lg">king_bed</span>{property.beds} {t("propertyCard.beds")}</div>
            <div className="flex items-center gap-2 text-nordic-muted text-sm"><span className="material-icons text-lg">bathtub</span>{property.baths} {t("propertyCard.baths")}</div>
            <div className="flex items-center gap-2 text-nordic-muted text-sm"><span className="material-icons text-lg">square_foot</span>{property.area.toLocaleString()} {t("propertyCard.areaUnit")}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
