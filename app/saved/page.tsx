import Link from "next/link";
import Navbar from "@/components/Navbar";
import SavedPropertiesContent from "@/components/SavedPropertiesContent";
import { createClient } from "@/utils/supabase/server";
import type { Property } from "@/data/mockProperties";

export const metadata = { title: "Saved Homes — LuxeEstate" };

export default async function SavedPropertiesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-nordic-dark">Guardados</h1>
          <p className="mt-2 text-sm text-nordic-muted">Tus propiedades favoritas, guardadas en este dispositivo.</p>
        </div>
        {error ? (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            No se pudieron cargar las propiedades guardadas. Inténtalo de nuevo más tarde.
          </div>
        ) : (
          <SavedPropertiesContent properties={(data ?? []) as Property[]} />
        )}
        <div className="mt-8">
          <Link href="/" className="text-sm font-medium text-mosque hover:underline">Explorar propiedades</Link>
        </div>
      </main>
    </>
  );
}
