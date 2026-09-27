"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix missing marker icons in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface PropertyMapProps {
  lat: number;
  lng: number;
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function PropertyMap({ lat, lng, onLocationSelect }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const onLocationSelectRef = useRef(onLocationSelect);

  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect;
  }, [onLocationSelect]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (isNaN(lat) || isNaN(lng)) return;

    if (!leafletMap.current) {
      const map = L.map(mapRef.current).setView([lat, lng], 13);
      leafletMap.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const marker = L.marker([lat, lng], { draggable: Boolean(onLocationSelectRef.current) }).addTo(map);
      markerRef.current = marker;

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        onLocationSelectRef.current?.(pos.lat, pos.lng);
      });

      map.on("click", (e: L.LeafletMouseEvent) => {
        if (onLocationSelectRef.current) {
          marker.setLatLng(e.latlng);
          onLocationSelectRef.current(e.latlng.lat, e.latlng.lng);
        }
      });

      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 200);

      return () => {
        clearTimeout(timer);
        map.remove();
        leafletMap.current = null;
        markerRef.current = null;
      };
    } else {
      leafletMap.current.setView([lat, lng], leafletMap.current.getZoom() || 13);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        const marker = L.marker([lat, lng], { draggable: Boolean(onLocationSelectRef.current) }).addTo(leafletMap.current);
        markerRef.current = marker;
      }
    }
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full rounded-xl z-0 relative" />;
}
