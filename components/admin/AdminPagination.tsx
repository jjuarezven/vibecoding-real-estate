"use client";

import { useTranslation } from "@/context/LanguageContext";

interface AdminPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function AdminPagination({ page, pageSize, total, onPageChange }: AdminPaginationProps) {
  const { t } = useTranslation();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  return (
    <div className="mt-6 mb-2 flex w-full flex-col gap-3 border-t border-nordic-dark/5 px-1 pt-5 text-sm text-nordic-muted sm:flex-row sm:items-center sm:justify-between sm:px-0">
      <span>{t("admin.pagination.showing", { from: first, to: last, total })}</span>
      <div className="flex shrink-0 items-center gap-2 pr-1 pb-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="shrink-0 rounded-md border border-gray-200 px-3 py-1 transition-colors hover:border-mosque hover:text-mosque disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("pagination.previous")}
        </button>
        <span className="whitespace-nowrap px-2 py-1 text-nordic-dark">{t("pagination.pageOf", { current: page, total: totalPages })}</span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="shrink-0 rounded-md border border-gray-200 px-3 py-1 transition-colors hover:border-mosque hover:text-mosque disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("pagination.next")}
        </button>
      </div>
    </div>
  );
}
