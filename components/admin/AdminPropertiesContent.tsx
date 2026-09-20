"use client";

import { useLanguage, useTranslation } from "@/context/LanguageContext";

type Property = { id: string; title: string; location: string; type: string; price: number | string; beds: number; baths: number; area: number; images: unknown; property_category: string | null; is_featured: boolean };

function imageUrl(images: unknown) {
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0] as { url?: string } | string;
    return typeof first === "string" ? first : first?.url;
  }
  return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
}

function status(property: Property, t: (key: string) => string) {
  if (property.is_featured) return { label: t("admin.properties.active"), style: "bg-hint-green text-mosque border-mosque/10" };
  if (property.type === "RENT") return { label: t("admin.properties.pending"), style: "bg-orange-100 text-orange-700 border-orange-200" };
  return { label: t("admin.properties.active"), style: "bg-hint-green text-mosque border-mosque/10" };
}

export default function AdminPropertiesContent({ properties, error }: { properties: Property[]; error: boolean }) {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const active = properties.filter((property) => status(property, t).label === t("admin.properties.active")).length;
  const pending = properties.filter((property) => status(property, t).label === t("admin.properties.pending")).length;
  const formatter = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-3xl font-bold tracking-tight">{t("admin.properties.title")}</h1><p className="mt-1 text-nordic-muted">{t("admin.properties.subtitle")}</p></div><div className="flex items-center gap-3"><button type="button" disabled className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-nordic-dark opacity-70 shadow-sm"><span className="material-icons text-base">filter_list</span>{t("admin.properties.filter")}</button><button type="button" disabled className="inline-flex items-center gap-2 rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white opacity-70 shadow-md"><span className="material-icons text-base">add</span>{t("admin.properties.add")}</button></div></div>
      <div className="mb-8 grid gap-6 sm:grid-cols-3"><Stat label={t("admin.properties.totalListings")} value={properties.length} icon="apartment" /><Stat label={t("admin.properties.activeProperties")} value={active} icon="check_circle" accent="green" /><Stat label={t("admin.properties.pendingSale")} value={pending} icon="pending" accent="orange" /></div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/70 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-nordic-muted md:grid"><div className="col-span-6">{t("admin.properties.details")}</div><div className="col-span-2">{t("admin.properties.price")}</div><div className="col-span-2">{t("admin.properties.status")}</div><div className="col-span-2 text-right">{t("admin.properties.actions")}</div></div>
        {error ? <p className="p-8 text-red-600">{t("admin.properties.loadError")}</p> : properties.map((property) => { const current = status(property, t); return <div key={property.id} className="group grid grid-cols-1 items-center gap-4 border-b border-gray-100 px-6 py-5 transition-colors last:border-0 hover:bg-background-light md:grid-cols-12"><div className="flex gap-4 md:col-span-6"><div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-200"><img src={imageUrl(property.images)} alt={property.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="min-w-0"><h3 className="truncate text-lg font-bold group-hover:text-mosque">{property.title}</h3><p className="truncate text-sm text-nordic-muted">{property.location}</p><div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-nordic-muted"><span className="flex items-center gap-1"><span className="material-icons text-[14px]">bed</span>{property.beds} {t("admin.properties.beds")}</span><span className="h-1 w-1 rounded-full bg-gray-300" /><span className="flex items-center gap-1"><span className="material-icons text-[14px]">bathtub</span>{property.baths} {t("admin.properties.baths")}</span><span className="h-1 w-1 rounded-full bg-gray-300" /><span>{property.area} {t("admin.properties.area")}</span></div></div></div><div className="col-span-6 md:col-span-2"><div className="font-semibold">{formatter.format(Number(property.price))}</div><div className="text-xs text-gray-400">{property.type === "RENT" ? t("admin.properties.monthly") : t("admin.properties.forSale")}</div></div><div className="col-span-6 md:col-span-2"><span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${current.style}`}><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />{current.label}</span></div><div className="col-span-12 flex items-center justify-end gap-2 md:col-span-2"><button type="button" disabled className="rounded-lg p-2 text-gray-400 opacity-70" title={t("admin.properties.edit")}><span className="material-icons text-xl">edit</span></button><button type="button" disabled className="rounded-lg p-2 text-gray-400 opacity-70" title={t("admin.properties.delete")}><span className="material-icons text-xl">delete_outline</span></button></div></div>; })}
        {!error && properties.length === 0 && <p className="p-12 text-center text-nordic-muted">{t("admin.properties.empty")}</p>}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-6 py-4 text-sm text-nordic-muted"><span>{t("admin.properties.showing", { shown: Math.min(properties.length, 5), total: properties.length })}</span><div className="flex gap-2"><button type="button" disabled className="rounded-md border border-gray-200 px-3 py-1 opacity-50">{t("pagination.previous")}</button><button type="button" disabled className="rounded-md border border-gray-200 px-3 py-1 opacity-50">{t("pagination.next")}</button></div></div>
      </div>
    </section>
  );
}

function Stat({ label, value, icon, accent = "default" }: { label: string; value: number; icon: string; accent?: "default" | "green" | "orange" }) {
  const iconClass = accent === "green" ? "bg-hint-green text-mosque" : accent === "orange" ? "bg-orange-100 text-orange-600" : "bg-mosque/10 text-mosque";
  return <div className="flex items-center justify-between rounded-xl border border-mosque/10 bg-white p-5 shadow-sm"><div><p className="text-sm font-medium text-nordic-muted">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClass}`}><span className="material-icons">{icon}</span></div></div>;
}
