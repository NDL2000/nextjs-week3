import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Prev */}
      {page > 1 ? (
        <Link
          href={`/dashboard?page=${page - 1}`}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← Prev
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-100 text-gray-300 cursor-not-allowed">
          ← Prev
        </span>
      )}

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={`/dashboard?page=${p}`}
          className={`w-9 h-9 rounded-xl text-sm font-medium flex items-center justify-center transition-colors ${
            p === page
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {p}
        </Link>
      ))}

      {/* Next */}
      {page < totalPages ? (
        <Link
          href={`/dashboard?page=${page + 1}`}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-100 text-gray-300 cursor-not-allowed">
          Next →
        </span>
      )}
    </div>
  );
}
