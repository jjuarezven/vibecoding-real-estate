"use client";

import { useState } from "react";

interface Image {
  url: string;
  alt: string;
}

interface PropertyGalleryProps {
  images: Image[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const mainImage = images[activeIndex];
  const sideImages = images.filter((_, i) => i !== activeIndex).slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 mb-12 rounded-xl overflow-hidden h-[400px] md:h-[520px]">
      {/* Main large image */}
      <div className="col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden">
        <img
          src={mainImage.url}
          alt={mainImage.alt}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <span className="material-icons text-sm">photo_library</span>
          {images.length} photos
        </div>
      </div>

      {/* Side grid - up to 4 thumbnails (excluding the active one) */}
      {sideImages.map((img, idx) => {
        // Find the real index in the original array so we can set it on click
        const realIndex = images.findIndex(
          (original) => original.url === img.url
        );
        const isLast = idx === 3 && images.length > 5;

        return (
          <div
            key={img.url}
            onClick={() => setActiveIndex(realIndex)}
            className="relative group cursor-pointer overflow-hidden hidden md:block"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            {/* "See more" overlay on the last visible cell */}
            {isLast && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
