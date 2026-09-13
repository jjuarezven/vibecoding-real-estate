"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Pagination({ currentPage, totalPages, searchParams = {} }: PaginationProps) {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && typeof value === "string") params.set(key, value);
    });
    params.set("page", page.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 ? <Link href={buildPageUrl(currentPage - 1)} className="px-4 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all shadow-sm">{t("pagination.previous")}</Link> : <button disabled className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-400 font-medium rounded-lg shadow-sm cursor-not-allowed">{t("pagination.previous")}</button>}
      <span className="text-sm font-medium text-nordic-dark px-4">{t("pagination.pageOf", { current: currentPage, total: totalPages })}</span>
      {currentPage < totalPages ? <Link href={buildPageUrl(currentPage + 1)} className="px-4 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all shadow-sm">{t("pagination.next")}</Link> : <button disabled className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-400 font-medium rounded-lg shadow-sm cursor-not-allowed">{t("pagination.next")}</button>}
    </div>
  );
}
