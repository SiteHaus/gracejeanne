export default function ShopLoading() {
  return (
    <div className="w-full">
      {/* Hero skeleton */}
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="h-4 w-32 bg-white/20 rounded mb-3 animate-pulse" />
          <div className="h-12 w-64 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-white/20 rounded animate-pulse" />
        </div>
      </section>

      {/* Filter bar skeleton */}
      <section className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-5xl mx-auto flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-20 bg-gray-100 rounded-full animate-pulse"
            />
          ))}
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100"
            >
              <div className="aspect-square bg-gray-100 animate-pulse" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
                <div className="flex justify-between pt-2 border-t border-gray-50">
                  <div className="h-6 w-16 bg-gray-100 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
