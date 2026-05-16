export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar skeleton */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="w-32 h-6 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="w-32 h-7 bg-gray-200 rounded-lg animate-pulse mb-2" />
            <div className="w-20 h-4 bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="w-28 h-10 bg-gray-200 rounded-xl animate-pulse" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-4">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex gap-8">
            {["Title", "Description", "Status", "Actions"].map((h) => (
              <div
                key={h}
                className="w-20 h-4 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="px-5 py-4 border-b border-gray-100 flex gap-8 items-center"
            >
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-48 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex gap-2">
                <div className="w-12 h-7 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-14 h-7 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
