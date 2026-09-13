import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && typeof value === "string") {
        params.set(key, value);
      }
    });
    params.set("page", page.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 ? (
        <Link
          href={buildPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all shadow-sm"
        >
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-400 font-medium rounded-lg shadow-sm cursor-not-allowed"
        >
          Previous
        </button>
      )}

      <span className="text-sm font-medium text-nordic-dark px-4">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all shadow-sm"
        >
          Next
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-400 font-medium rounded-lg shadow-sm cursor-not-allowed"
        >
          Next
        </button>
      )}
    </div>
  );
}
