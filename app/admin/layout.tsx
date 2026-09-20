import Link from "next/link";
import { requireAdmin } from "@/utils/roles";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen bg-background-light text-nordic-dark">
      <header className="border-b border-nordic-dark/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex items-center gap-3"><span className="material-icons rounded-lg bg-nordic-dark p-2 text-white">admin_panel_settings</span><span className="text-xl font-semibold">Panel administrativo</span></Link>
          <Link href="/" className="text-sm font-medium text-mosque hover:underline">Volver al sitio</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
