import Link from "next/link";
import { Property } from "../data/mockProperties";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className = "" }: PropertyCardProps) {
  const isRent = property.type === "RENT";
  
  return (
    <Link href={`/propiedades/${property.slug}`} className={`block group h-full ${className}`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-card group-hover:shadow-soft transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            alt={property.images[0].alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={property.images[0].url}
          />
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-mosque hover:text-white transition-colors text-nordic-dark">
          <span className="material-icons text-lg">favorite_border</span>
        </button>
        <div 
          className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${
 isRent ? "bg-mosque/90" : "bg-nordic-dark/90"
 }`}
        >
          {isRent ? "FOR RENT" : "FOR SALE"}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-nordic-dark">
            ${property.price.toLocaleString()}
            {isRent && <span className="text-sm font-normal text-nordic-muted">/mo</span>}
          </h3>
        </div>
        <h4 className="text-nordic-dark font-medium truncate mb-1">
          {property.title}
        </h4>
        <p className="text-nordic-muted text-xs mb-4">{property.location}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80">king_bed</span>{" "}
            {property.beds}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80">bathtub</span>{" "}
            {property.baths}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80">square_foot</span>{" "}
            {property.area}m²
          </div>
        </div>
      </div>
      </article>
    </Link>
  );
}
