"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage, useTranslation } from "@/context/LanguageContext";
import { ADMIN_PAGE_SIZE } from "@/constants/admin";
import AdminPagination from "@/components/admin/AdminPagination";

type Property = { id: string; title: string; location: string; type: string; price: number | string; beds: number; baths: number; area: number; images: unknown; property_category: string | null; is_featured: boolean; is_active: boolean };

function imageUrl(images: unknown) {
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0] as { url?: string } | string;
    return typeof first === "string" ? first : first?.url;
  }
  return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
}

function status(property: Property, t: (key: string) => string, locale: string) {
  if (!property.is_active) return { label: locale === "es" ? "Inactiva" : "Inactive", style: "bg-gray-100 text-gray-600 border-gray-200" };
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
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const active = properties.filter((p) => p.is_active).length;
  const pending = properties.filter((p) => p.is_active && !p.is_featured && p.type === "RENT").length;
  const visibleProperties = useMemo(() => properties.slice((page - 1) * ADMIN_PAGE_SIZE, page * ADMIN_PAGE_SIZE), [page, properties]);
  const formatter = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });


  const handleToggleActive = async (property: Property) => {
    const nextIsActive = !property.is_active;
    const confirmation = locale === "es"
      ? nextIsActive ? "¿Reactivar la propiedad" : "¿Desactivar la propiedad"
      : nextIsActive ? "Reactivate the property" : "Deactivate the property";
    const irreversibleWarning = locale === "es" ? "La propiedad se conservará en el panel." : "The property will remain in the admin list.";
    if (!confirm(`${confirmation} "${property.title}"? ${irreversibleWarning}`)) return;

    setUpdatingId(property.id);
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/properties/${property.id}`, {
        method: nextIsActive ? "PATCH" : "DELETE",
        ...(nextIsActive ? {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_active: true }),
        } : {}),
      });
      const result = await res.json();
      if (!res.ok) {
        setActionError(result.error || (locale === "es" ? "No se pudo actualizar el estado de la propiedad." : "Could not update the property status."));
        return;
      }
      setProperties((prev) => prev.map((item) => item.id === property.id ? { ...item, is_active: nextIsActive } : item));
      router.refresh();
    } catch {
      setActionError(locale === "es" ? "No se pudo actualizar el estado de la propiedad." : "Could not update the property status.");
    } finally {
      setUpdatingId(null);
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
      {actionError && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{actionError}</p>}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/70 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-nordic-muted md:grid">
          <div className="col-span-6">{t("admin.properties.details")}</div>
          <div className="col-span-2">{t("admin.properties.price")}</div>
          <div className="col-span-2">{t("admin.properties.status")}</div>
          <div className="col-span-2 text-right">{t("admin.properties.actions")}</div>
        </div>
        {error ? <p className="p-8 text-red-600">{t("admin.properties.loadError")}</p> : visibleProperties.map((property) => {
          const current = status(property, t, locale);
          const isUpdating = updatingId === property.id;
          const toggleLabel = property.is_active
            ? locale === "es" ? "Desactivar propiedad" : "Deactivate property"
            : locale === "es" ? "Reactivar propiedad" : "Reactivate property";
          return (
            <div key={property.id} className={`group grid grid-cols-1 items-center gap-4 border-b border-gray-100 px-6 py-5 transition-colors last:border-0 hover:bg-background-light md:grid-cols-12 ${!property.is_active ? "opacity-75" : ""}`}>
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
                  disabled={isUpdating}
                  onClick={() => handleToggleActive(property)}
                  className={`rounded-lg p-2 transition-colors disabled:cursor-wait disabled:opacity-50 ${property.is_active ? "text-gray-400 hover:bg-red-50 hover:text-red-600" : "text-mosque hover:bg-mosque/10"}`}
                  title={toggleLabel}
                  aria-label={toggleLabel}
                >
                  <span className="material-icons text-xl">{isUpdating ? "hourglass_top" : property.is_active ? "delete_outline" : "restore"}</span>
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
