"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false });

export default function ClientPropertyMap({
  lat,
  lng,
  onLocationSelect,
}: {
  lat: number;
  lng: number;
  onLocationSelect?: (lat: number, lng: number) => void;
}) {
  return <PropertyMap lat={lat} lng={lng} onLocationSelect={onLocationSelect} />;
}
