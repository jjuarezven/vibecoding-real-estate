"use client";

import { useTranslation } from "@/context/LanguageContext";

export default function AdminUsersHeader({ count }: { count: number }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.users.title")}</h1>
        <p className="mt-1 text-sm text-nordic-muted">{t("admin.users.subtitle")}</p>
      </div>
      <div className="flex w-full gap-3 sm:w-auto">
        <div className="hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-nordic-muted shadow-soft sm:flex"><span className="material-icons text-lg">group</span>{t("admin.users.userCount", { count })}</div>
        <button type="button" disabled className="inline-flex items-center gap-2 rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white opacity-70 shadow-md"><span className="material-icons text-base">add</span>{t("admin.users.addUser")}</button>
      </div>
    </div>
  );
}
