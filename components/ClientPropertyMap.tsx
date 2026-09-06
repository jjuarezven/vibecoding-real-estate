"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false });

export default function ClientPropertyMap({ lat, lng }: { lat: number; lng: number }) {
  return <PropertyMap lat={lat} lng={lng} />;
}
