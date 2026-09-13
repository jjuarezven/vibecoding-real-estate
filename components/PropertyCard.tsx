"use client";

import Link from "next/link";
import { Property } from "../data/mockProperties";
import { useTranslation } from "@/context/LanguageContext";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className = "" }: PropertyCardProps) {
  const { t } = useTranslation();
  const isRent = property.type === "RENT";

  return (
    <Link href={`/propiedades/${property.slug}`} className={`block group h-full ${className}`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-card group-hover:shadow-soft transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img alt={property.images[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={property.images[0].url} />
          <button type="button" onClick={(event) => event.preventDefault()} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-mosque hover:text-white transition-colors text-nordic-dark">
            <span className="material-icons text-base">favorite_border</span>
          </button>
          <div className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${isRent ? "bg-mosque/90" : "bg-nordic-dark/90"}`}>
            {isRent ? t("propertyCard.forRent") : t("propertyCard.forSale")}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-nordic-dark">${property.price.toLocaleString()}{isRent && <span className="text-sm font-normal text-nordic-muted">{t("propertyCard.perMonth")}</span>}</h3>
          <h4 className="text-nordic-dark font-medium truncate mb-1">{property.title}</h4>
          <p className="text-nordic-muted text-xs mb-4">{property.location}</p>
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-nordic-muted text-xs"><span className="material-icons text-sm text-mosque/80">king_bed</span>{property.beds} {t("propertyCard.beds")}</div>
            <div className="flex items-center gap-1 text-nordic-muted text-xs"><span className="material-icons text-sm text-mosque/80">bathtub</span>{property.baths} {t("propertyCard.baths")}</div>
            <div className="flex items-center gap-1 text-nordic-muted text-xs"><span className="material-icons text-sm text-mosque/80">square_foot</span>{property.area}{t("propertyCard.areaUnit")}</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
