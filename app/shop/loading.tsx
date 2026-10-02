export default function ShopLoading() {
  return (
    <div className="w-full">
      {/* Heading skeleton */}
      <section className="px-6 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <div className="h-9 w-72 bg-white/10 animate-pulse" />
          <div className="h-4 w-full max-w-md bg-white/5 animate-pulse" />
        </div>
      </section>

      {/* Sort bar skeleton */}
      <section className="border-y border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <div className="h-4 w-24 bg-white/5 animate-pulse" />
          <div className="h-8 w-40 bg-white/5 animate-pulse" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="w-full aspect-[4/5] bg-card animate-pulse" />
              <div className="h-5 w-40 bg-white/10 animate-pulse" />
              <div className="w-full flex justify-between pt-3 border-t border-border">
                <div className="h-5 w-16 bg-white/5 animate-pulse" />
                <div className="h-8 w-28 bg-white/5 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
