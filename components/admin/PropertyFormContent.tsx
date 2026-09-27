"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import ClientPropertyMap from "@/components/ClientPropertyMap";

// ─── Types ────────────────────────────────────────────────────────────────────
type ImageItem = { url: string; path?: string; isMain?: boolean };

type PropertyData = {
  id?: string; title?: string; slug?: string; location?: string;
  lat?: number; lng?: number; price?: number; type?: string;
  beds?: number; baths?: number; area?: number; images?: unknown;
  badge?: string | null; is_featured?: boolean; amenities?: string[];
  property_category?: string | null; description?: string | null;
  year_built?: number | null; parking?: number | null;
};

type Props =
  | { mode: "create"; property?: undefined }
  | { mode: "edit"; property: PropertyData };

const AMENITY_OPTIONS = [
  { value: "pool", icon: "pool" },
  { value: "garden", icon: "park" },
  { value: "airConditioning", icon: "ac_unit" },
  { value: "smartHome", icon: "home" },
  { value: "gym", icon: "fitness_center" },
  { value: "wifi", icon: "wifi" },
  { value: "parking", icon: "local_parking" },
];

const PROPERTY_TYPES = ["Apartment", "House", "Villa", "Penthouse", "Townhouse", "Commercial"];
const SALE_TYPES = ["SALE", "RENT"];

function parseImages(raw: unknown): ImageItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, i) => {
    if (typeof item === "string") return { url: item, isMain: i === 0 };
    if (typeof item === "object" && item !== null && "url" in item) {
      return { url: (item as { url: string }).url, path: (item as { path?: string }).path, isMain: i === 0 };
    }
    return null;
  }).filter(Boolean) as ImageItem[];
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ value, onChange, min = 0, max = 20 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="flex h-8 w-8 items-center justify-center border-r border-gray-100 text-gray-600 transition-colors hover:bg-gray-50">−</button>
      <span className="w-10 text-center text-sm font-medium text-nordic-dark">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="flex h-8 w-8 items-center justify-center border-l border-gray-100 text-gray-600 transition-colors hover:bg-gray-50">+</button>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function Section({ icon, title, children, className = "" }: { icon: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ${className}`}>
      <div className="flex items-center gap-3 border-b border-hint-green/30 bg-gradient-to-r from-hint-green/10 to-transparent px-8 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hint-green text-nordic-dark">
          <span className="material-icons text-lg">{icon}</span>
        </div>
        <h2 className="text-xl font-bold text-nordic-dark">{title}</h2>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}

function SideSection({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-hint-green/30 bg-gradient-to-r from-hint-green/10 to-transparent px-6 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hint-green text-nordic-dark">
          <span className="material-icons text-lg">{icon}</span>
        </div>
        <h2 className="text-lg font-bold text-nordic-dark">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PropertyFormContent({ mode, property }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [currentMode, setCurrentMode] = useState<"create" | "edit">(mode);
  const [currentPropertyId, setCurrentPropertyId] = useState<string | undefined>(property?.id);
  const [currentPropertySlug, setCurrentPropertySlug] = useState<string | undefined>(property?.slug);
  const [title, setTitle] = useState(property?.title ?? "");
  const [price, setPrice] = useState(String(property?.price ?? ""));
  const [saleType, setSaleType] = useState(property?.type ?? "SALE");
  const [propType, setPropType] = useState(property?.property_category ?? "House");
  const [badge, setBadge] = useState(property?.badge ?? "");
  const [isFeatured, setIsFeatured] = useState(property?.is_featured ?? false);
  const [description, setDescription] = useState(property?.description ?? "");
  const [location, setLocation] = useState(property?.location ?? "");
  const [lat, setLat] = useState(String(property?.lat ?? ""));
  const [lng, setLng] = useState(String(property?.lng ?? ""));
  const [area, setArea] = useState(String(property?.area ?? ""));
  const [yearBuilt, setYearBuilt] = useState(String(property?.year_built ?? ""));
  const [beds, setBeds] = useState(property?.beds ?? 1);
  const [baths, setBaths] = useState(Math.round(property?.baths ?? 1));
  const [parking, setParking] = useState(property?.parking ?? 0);
  const [amenities, setAmenities] = useState<string[]>(property?.amenities ?? []);
  const [images, setImages] = useState<ImageItem[]>(parseImages(property?.images));

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(property?.description?.length ?? 0);
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    propertyId?: string;
    propertySlug?: string;
    propertyTitle?: string;
  }>({
    isOpen: false,
    mode,
  });

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);
  const hasCoordinates =
    lat.trim() !== "" &&
    lng.trim() !== "" &&
    !isNaN(parsedLat) &&
    !isNaN(parsedLng);

  // ── Image upload ────────────────────────────────────────────────────────────
  const handleFiles = useCallback(async (files: FileList) => {
    setUploading(true);
    setError(null);
    const uploaded: ImageItem[] = [];
    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) { setError(t("admin.propertyForm.imageTooLarge")); continue; }
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (json.url) uploaded.push({ url: json.url, path: json.path });
        else setError(json.error ?? t("admin.propertyForm.uploadError"));
      } catch {
        setError(t("admin.propertyForm.uploadError"));
      }
    }
    setImages(prev => {
      const next = [...prev, ...uploaded];
      if (next.length > 0 && !next.some(img => img.isMain)) next[0] = { ...next[0], isMain: true };
      return next;
    });
    setUploading(false);
  }, [t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = async (idx: number) => {
    const img = images[idx];
    if (img.path) {
      await fetch("/api/admin/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: img.path }) });
    }
    setImages(prev => {
      const next = prev.filter((_, i) => i !== idx);
      if (next.length && img.isMain) next[0] = { ...next[0], isMain: true };
      return next;
    });
  };

  const setMain = (idx: number) => {
    setImages(prev => prev.map((img, i) => ({ ...img, isMain: i === idx })));
  };

  // ── Amenity toggle ──────────────────────────────────────────────────────────
  const toggleAmenity = (value: string) => {
    setAmenities(prev => prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]);
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      title: title.trim(), location: location.trim(),
      lat: parseFloat(lat) || 0, lng: parseFloat(lng) || 0,
      price: parseFloat(price), type: saleType,
      beds, baths, area: parseFloat(area),
      images: images.map(img => ({ url: img.url, path: img.path })),
      badge: badge.trim() || null, is_featured: isFeatured,
      amenities, property_category: propType,
      description: description.trim() || null,
      year_built: yearBuilt ? parseInt(yearBuilt) : null,
      parking,
    };

    const isEdit = currentMode === "edit" && currentPropertyId;
    const url = isEdit ? `/api/admin/properties/${currentPropertyId}` : "/api/admin/properties";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? t("admin.propertyForm.saveError")); setSaving(false); return; }

      const savedProperty = json.property;
      const savedId = savedProperty?.id || (isEdit ? currentPropertyId : undefined);
      const savedSlug = savedProperty?.slug || (isEdit ? currentPropertySlug : undefined);

      setSaving(false);
      setSuccessModal({
        isOpen: true,
        mode: currentMode,
        propertyId: savedId,
        propertySlug: savedSlug,
        propertyTitle: title.trim(),
      });

      if (currentMode === "create" && savedId) {
        setCurrentMode("edit");
        setCurrentPropertyId(savedId);
        if (savedSlug) setCurrentPropertySlug(savedSlug);
        window.history.replaceState(null, "", `/admin/properties/${savedId}/edit`);
      }

      router.refresh();
    } catch {
      setError(t("admin.propertyForm.saveError"));
      setSaving(false);
    }
  };

  const isEdit = currentMode === "edit";
  const pageTitle = isEdit ? t("admin.propertyForm.editTitle") : t("admin.propertyForm.newTitle");

  return (
    <div className="pb-16">
      {/* ── Sticky Action Bar Header ── */}
      <header className="sticky top-16 z-30 mb-8 -mx-4 -mt-8 flex flex-col justify-between gap-4 border-b border-gray-200/80 bg-background-light/95 px-4 py-4 shadow-sm backdrop-blur-md sm:-mx-6 sm:px-6 md:flex-row md:items-center lg:-mx-8 lg:px-8">
        <div>
          <nav aria-label="Breadcrumb" className="mb-1">
            <ol className="flex items-center space-x-2 text-xs text-nordic-muted">
              <li><Link href="/admin/properties" className="transition-colors hover:text-mosque">{t("admin.nav.listings")}</Link></li>
              <li><span className="material-icons text-xs text-gray-400">chevron_right</span></li>
              <li aria-current="page" className="font-medium text-nordic-dark">{isEdit ? t("admin.propertyForm.editBreadcrumb") : t("admin.propertyForm.newBreadcrumb")}</li>
            </ol>
          </nav>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-nordic-dark sm:text-3xl">{pageTitle}</h1>
            <p className="hidden text-xs text-gray-500 sm:block sm:text-sm">{t("admin.propertyForm.subtitle")}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-3">
          <Link href="/admin/properties" className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-nordic-dark shadow-sm transition-colors hover:bg-gray-50">
            {t("admin.propertyForm.cancel")}
          </Link>
          <button form="property-form" type="submit" disabled={saving || uploading} className="flex items-center gap-2 rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-nordic-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60">
            <span className="material-icons text-sm">{saving ? "hourglass_top" : "save"}</span>
            {saving ? t("admin.propertyForm.saving") : t("admin.propertyForm.save")}
          </button>
        </div>
      </header>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="material-icons text-base">error_outline</span> {error}
          </div>
        )}

        {/* ── Form ── */}
        <form id="property-form" onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
          {/* Left column */}
          <div className="space-y-8 xl:col-span-8">
            {/* Basic Information */}
            <Section icon="info" title={t("admin.propertyForm.basicInfo")}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="pf-title" className="mb-1.5 block text-sm font-medium text-nordic-dark">{t("admin.propertyForm.titleLabel")} <span className="text-red-500">*</span></label>
                  <input id="pf-title" type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder={t("admin.propertyForm.titlePlaceholder")} className="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-base text-nordic-dark placeholder-gray-400 transition-all focus:border-mosque focus:outline-none focus:ring-1 focus:ring-mosque" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <label htmlFor="pf-price" className="mb-1.5 block text-sm font-medium text-nordic-dark">{t("admin.propertyForm.price")} <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                      <input id="pf-price" type="number" required min={0} value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" className="w-full rounded-md border border-gray-200 bg-white py-2.5 pl-7 pr-4 text-base font-medium text-nordic-dark placeholder-gray-400 transition-all focus:border-mosque focus:outline-none focus:ring-1 focus:ring-mosque" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="pf-type" className="mb-1.5 block text-sm font-medium text-nordic-dark">{t("admin.propertyForm.saleType")}</label>
                    <select id="pf-type" value={saleType} onChange={e => setSaleType(e.target.value)} className="w-full cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2.5 text-base text-nordic-dark transition-all focus:border-mosque focus:outline-none focus:ring-1 focus:ring-mosque">
                      {SALE_TYPES.map(tKey => <option key={tKey} value={tKey}>{t(`admin.propertyForm.saleType_${tKey}`)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pf-category" className="mb-1.5 block text-sm font-medium text-nordic-dark">{t("admin.propertyForm.propertyType")}</label>
                    <select id="pf-category" value={propType} onChange={e => setPropType(e.target.value)} className="w-full cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2.5 text-base text-nordic-dark transition-all focus:border-mosque focus:outline-none focus:ring-1 focus:ring-mosque">
                      {PROPERTY_TYPES.map(tKey => <option key={tKey} value={tKey}>{t(`admin.propertyForm.propType_${tKey}`)}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="pf-badge" className="mb-1.5 block text-sm font-medium text-nordic-dark">{t("admin.propertyForm.badge")}</label>
                    <select id="pf-badge" value={badge} onChange={e => setBadge(e.target.value)} className="w-full cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2.5 text-base text-nordic-dark transition-all focus:border-mosque focus:outline-none focus:ring-1 focus:ring-mosque">
                      <option value="">{t("admin.propertyForm.badgeNone")}</option>
                      <option value="exclusive">{t("admin.propertyForm.badgeExclusive")}</option>
                      <option value="new">{t("admin.propertyForm.badgeNew")}</option>
                      <option value="design">{t("admin.propertyForm.badgeDesign")}</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input id="pf-featured" type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-mosque focus:ring-mosque" />
                    <label htmlFor="pf-featured" className="cursor-pointer text-sm font-medium text-nordic-dark">{t("admin.propertyForm.featured")}</label>
                  </div>
                </div>
              </div>
            </Section>

            {/* Description */}
            <Section icon="description" title={t("admin.propertyForm.description")}>
              <textarea
                id="pf-description"
                value={description}
                onChange={e => { setDescription(e.target.value); setCharCount(e.target.value.length); }}
                maxLength={2000}
                placeholder={t("admin.propertyForm.descriptionPlaceholder")}
                className="min-h-[200px] w-full resize-y rounded-md border border-gray-200 bg-white px-4 py-3 text-base leading-relaxed text-nordic-dark placeholder-gray-400 transition-all focus:border-mosque focus:outline-none focus:ring-1 focus:ring-mosque"
              />
              <div className="mt-2 text-right text-xs text-gray-400">{charCount} / 2000</div>
            </Section>

            {/* Gallery */}
            <Section icon="image" title={t("admin.propertyForm.gallery")}>
              {/* Drop zone */}
              <div
                role="button" tabIndex={0}
                className="group relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-10 text-center transition-colors hover:border-mosque/40 hover:bg-hint-green/10"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={e => e.key === "Enter" && fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
              >
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-mosque shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <span className="material-icons text-2xl">{uploading ? "hourglass_top" : "cloud_upload"}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-medium text-nordic-dark">{uploading ? t("admin.propertyForm.uploading") : t("admin.propertyForm.dropHere")}</p>
                    <p className="text-xs text-gray-400">{t("admin.propertyForm.imageHint")}</p>
                  </div>
                </div>
              </div>

              {/* Image grid */}
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={`Property image ${idx + 1}`} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-nordic-dark/60 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                        <button type="button" onClick={() => setMain(idx)} title={t("admin.propertyForm.setMain")} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-mosque transition-colors hover:bg-mosque hover:text-white">
                          <span className="material-icons text-sm">star</span>
                        </button>
                        <button type="button" onClick={() => removeImage(idx)} title={t("admin.propertyForm.removeImage")} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 transition-colors hover:bg-red-50">
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </div>
                      {img.isMain && (
                        <span className="absolute left-2 top-2 rounded bg-mosque px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          {t("admin.propertyForm.mainImage")}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </div>

          {/* Right sidebar */}
          <div className="sticky top-36 space-y-8 xl:col-span-4">
            {/* Location */}
            <SideSection icon="place" title={t("admin.propertyForm.location")}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="pf-location" className="mb-1.5 block text-sm font-medium text-nordic-dark">{t("admin.propertyForm.address")} <span className="text-red-500">*</span></label>
                  <input id="pf-location" type="text" required value={location} onChange={e => setLocation(e.target.value)} placeholder={t("admin.propertyForm.addressPlaceholder")} className="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-nordic-dark placeholder-gray-400 transition-all focus:border-mosque focus:outline-none focus:ring-1 focus:ring-mosque" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="pf-lat" className="mb-1.5 block text-xs font-medium text-gray-500">{t("admin.propertyForm.latitude")}</label>
                    <input id="pf-lat" type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} placeholder="0.000000" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-nordic-dark placeholder-gray-400 transition-all focus:border-mosque focus:bg-white focus:outline-none focus:ring-1 focus:ring-mosque" />
                  </div>
                  <div>
                    <label htmlFor="pf-lng" className="mb-1.5 block text-xs font-medium text-gray-500">{t("admin.propertyForm.longitude")}</label>
                    <input id="pf-lng" type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} placeholder="0.000000" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-nordic-dark placeholder-gray-400 transition-all focus:border-mosque focus:bg-white focus:outline-none focus:ring-1 focus:ring-mosque" />
                  </div>
                </div>

                {hasCoordinates ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-3 py-2 text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-mosque">
                        <span className="material-icons text-sm">map</span>
                        <span>{t("admin.propertyForm.mapPreview")}</span>
                      </div>
                      <span className="font-mono text-[11px] text-gray-500">
                        {parsedLat.toFixed(4)}, {parsedLng.toFixed(4)}
                      </span>
                    </div>
                    <div className="relative h-56 w-full z-0">
                      <ClientPropertyMap
                        lat={parsedLat}
                        lng={parsedLng}
                        onLocationSelect={(newLat, newLng) => {
                          setLat(newLat.toFixed(6));
                          setLng(newLng.toFixed(6));
                        }}
                      />
                    </div>
                    <div className="border-t border-gray-100 bg-gray-50/60 px-3 py-2 text-[11px] text-gray-500 flex items-center gap-1.5">
                      <span className="material-icons text-xs text-mosque">touch_app</span>
                      <span>{t("admin.propertyForm.mapHint")}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-3 text-xs text-gray-400">
                    <span className="material-icons text-base text-gray-300">location_off</span>
                    <span>Ingresa latitud y longitud para ver la vista previa del mapa.</span>
                  </div>
                )}
              </div>
            </SideSection>

            {/* Details */}
            <SideSection icon="straighten" title={t("admin.propertyForm.details")}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pf-area" className="mb-1 block text-xs font-medium text-gray-500">{t("admin.propertyForm.area")} <span className="text-red-500">*</span></label>
                    <input id="pf-area" type="number" required min={0} value={area} onChange={e => setArea(e.target.value)} placeholder="0" className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-nordic-dark transition-all focus:border-mosque focus:bg-white focus:outline-none focus:ring-1 focus:ring-mosque" />
                  </div>
                  <div>
                    <label htmlFor="pf-year" className="mb-1 block text-xs font-medium text-gray-500">{t("admin.propertyForm.yearBuilt")}</label>
                    <input id="pf-year" type="number" min={1800} max={new Date().getFullYear()} value={yearBuilt} onChange={e => setYearBuilt(e.target.value)} placeholder="YYYY" className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-nordic-dark transition-all focus:border-mosque focus:bg-white focus:outline-none focus:ring-1 focus:ring-mosque" />
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-nordic-dark">
                      <span className="material-icons text-sm text-gray-400">bed</span> {t("admin.propertyForm.bedrooms")}
                    </label>
                    <Counter value={beds} onChange={setBeds} min={0} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-nordic-dark">
                      <span className="material-icons text-sm text-gray-400">shower</span> {t("admin.propertyForm.bathrooms")}
                    </label>
                    <Counter value={baths} onChange={setBaths} min={0} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-nordic-dark">
                      <span className="material-icons text-sm text-gray-400">directions_car</span> {t("admin.propertyForm.parking")}
                    </label>
                    <Counter value={parking} onChange={setParking} min={0} />
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Amenities */}
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">{t("admin.propertyForm.amenities")}</h3>
                  <div className="space-y-2">
                    {AMENITY_OPTIONS.map(opt => (
                      <label key={opt.value} className="group flex cursor-pointer items-center gap-2.5">
                        <input type="checkbox" checked={amenities.includes(opt.value)} onChange={() => toggleAmenity(opt.value)} className="h-4 w-4 rounded border-gray-300 text-mosque focus:ring-mosque" />
                        <span className="material-icons text-base text-gray-400 group-hover:text-mosque">{opt.icon}</span>
                        <span className="text-sm text-gray-700 transition-colors group-hover:text-nordic-dark">{t(`admin.propertyForm.amenity_${opt.value}`)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </SideSection>
          </div>
        </form>

        {/* Mobile bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 border-t border-gray-200 bg-white p-4 shadow-xl md:hidden">
          <Link href="/admin/properties" className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-medium text-nordic-dark">
            {t("admin.propertyForm.cancel")}
          </Link>
          <button form="property-form" type="submit" disabled={saving || uploading} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-mosque py-3 text-sm font-medium text-white disabled:opacity-60">
            <span className="material-icons text-sm">{saving ? "hourglass_top" : "save"}</span>
            {saving ? t("admin.propertyForm.saving") : t("admin.propertyForm.save")}
          </button>
        </div>

        {/* ── Informative Success Popup Modal ── */}
        {successModal.isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nordic-dark/60 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
          >
            <div
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label={t("admin.propertyForm.close")}
              >
                <span className="material-icons text-lg">close</span>
              </button>

              {/* Icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-hint-green/30 text-mosque ring-8 ring-hint-green/10">
                <span className="material-icons text-3xl">check_circle</span>
              </div>

              {/* Title & Description */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-nordic-dark">
                  {successModal.mode === "create"
                    ? t("admin.propertyForm.createSuccessTitle")
                    : t("admin.propertyForm.editSuccessTitle")}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {successModal.mode === "create"
                    ? t("admin.propertyForm.createSuccessMessage")
                    : t("admin.propertyForm.editSuccessMessage")}
                </p>

                {/* Property summary card */}
                {successModal.propertyTitle && (
                  <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/80 p-3.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-base text-mosque">apartment</span>
                      <p className="text-sm font-semibold text-nordic-dark truncate">
                        {successModal.propertyTitle}
                      </p>
                    </div>
                    {location && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 truncate">
                        <span className="material-icons text-xs text-gray-400">place</span>
                        {location}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                  className="flex-1 rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-center text-sm font-medium text-nordic-dark transition-colors hover:bg-gray-50"
                >
                  {t("admin.propertyForm.continueEditing")}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/admin/properties")}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-mosque py-2.5 px-4 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-nordic-dark"
                >
                  <span className="material-icons text-sm">list_alt</span>
                  {t("admin.propertyForm.viewListings")}
                </button>
              </div>

              {/* Optional public listing link */}
              {(successModal.propertySlug || successModal.propertyId) && (
                <div className="mt-4 text-center">
                  <Link
                    href={`/propiedades/${successModal.propertySlug || successModal.propertyId}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-medium text-mosque hover:underline"
                  >
                    <span>{t("admin.propertyForm.viewPublicProperty")}</span>
                    <span className="material-icons text-xs">open_in_new</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
