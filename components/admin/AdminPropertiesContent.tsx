"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage, useTranslation } from "@/context/LanguageContext";
import { ADMIN_PAGE_SIZE } from "@/constants/admin";
import AdminPagination from "@/components/admin/AdminPagination";

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

export default function AdminPropertiesContent({ properties: initialProperties, error }: { properties: Property[]; error: boolean }) {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const active = properties.filter((p) => p.is_featured || p.type !== "RENT").length;
  const pending = properties.filter((p) => !p.is_featured && p.type === "RENT").length;
  const visibleProperties = useMemo(() => properties.slice((page - 1) * ADMIN_PAGE_SIZE, page * ADMIN_PAGE_SIZE), [page, properties]);
  const formatter = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(properties.length / ADMIN_PAGE_SIZE));
    if (page > totalPages) setPage(totalPages);
  }, [page, properties.length]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties(prev => prev.filter(p => p.id !== id));
        router.refresh();
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("admin.properties.title")}</h1>
          <p className="mt-1 text-nordic-muted">{t("admin.properties.subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" disabled className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-nordic-dark opacity-70 shadow-sm">
            <span className="material-icons text-base">filter_list</span>{t("admin.properties.filter")}
          </button>
          <Link href="/admin/properties/new" className="inline-flex items-center gap-2 rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-nordic-dark">
            <span className="material-icons text-base">add</span>{t("admin.properties.add")}
          </Link>
        </div>
      </div>
      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <Stat label={t("admin.properties.totalListings")} value={properties.length} icon="apartment" />
        <Stat label={t("admin.properties.activeProperties")} value={active} icon="check_circle" accent="green" />
        <Stat label={t("admin.properties.pendingSale")} value={pending} icon="pending" accent="orange" />
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/70 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-nordic-muted md:grid">
          <div className="col-span-6">{t("admin.properties.details")}</div>
          <div className="col-span-2">{t("admin.properties.price")}</div>
          <div className="col-span-2">{t("admin.properties.status")}</div>
          <div className="col-span-2 text-right">{t("admin.properties.actions")}</div>
        </div>
        {error ? <p className="p-8 text-red-600">{t("admin.properties.loadError")}</p> : visibleProperties.map((property) => {
          const current = status(property, t);
          const isDeleting = deletingId === property.id;
          return (
            <div key={property.id} className="group grid grid-cols-1 items-center gap-4 border-b border-gray-100 px-6 py-5 transition-colors last:border-0 hover:bg-background-light md:grid-cols-12">
              <div className="flex gap-4 md:col-span-6">
                <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                  <img src={imageUrl(property.images)} alt={property.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold group-hover:text-mosque">{property.title}</h3>
                  <p className="truncate text-sm text-nordic-muted">{property.location}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-nordic-muted">
                    <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bed</span>{property.beds} {t("admin.properties.beds")}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bathtub</span>{property.baths} {t("admin.properties.baths")}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{property.area} {t("admin.properties.area")}</span>
                  </div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-2">
                <div className="font-semibold">{formatter.format(Number(property.price))}</div>
                <div className="text-xs text-gray-400">{property.type === "RENT" ? t("admin.properties.monthly") : t("admin.properties.forSale")}</div>
              </div>
              <div className="col-span-6 md:col-span-2">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${current.style}`}>
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />{current.label}
                </span>
              </div>
              <div className="col-span-12 flex items-center justify-end gap-2 md:col-span-2">
                <Link href={`/admin/properties/${property.id}/edit`} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-mosque/10 hover:text-mosque" title={t("admin.properties.edit")}>
                  <span className="material-icons text-xl">edit</span>
                </Link>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDelete(property.id, property.title)}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-wait disabled:opacity-50"
                  title={t("admin.properties.delete")}
                >
                  <span className="material-icons text-xl">{isDeleting ? "hourglass_top" : "delete_outline"}</span>
                </button>
              </div>
            </div>
          );
        })}
        {!error && properties.length === 0 && <p className="p-12 text-center text-nordic-muted">{t("admin.properties.empty")}</p>}
        <AdminPagination page={page} pageSize={ADMIN_PAGE_SIZE} total={properties.length} onPageChange={setPage} />
      </div>
    </section>
  );
}

function Stat({ label, value, icon, accent = "default" }: { label: string; value: number; icon: string; accent?: "default" | "green" | "orange" }) {
  const iconClass = accent === "green" ? "bg-hint-green text-mosque" : accent === "orange" ? "bg-orange-100 text-orange-600" : "bg-mosque/10 text-mosque";
  return <div className="flex items-center justify-between rounded-xl border border-mosque/10 bg-white p-5 shadow-sm"><div><p className="text-sm font-medium text-nordic-muted">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClass}`}><span className="material-icons">{icon}</span></div></div>;
}
