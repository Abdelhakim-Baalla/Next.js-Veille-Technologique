export default function Loading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Skeleton */}
        <section className="text-center mb-24">
          <div className="flex justify-center mb-8">
            <div className="skeleton h-10 w-48 rounded-full" />
          </div>
          <div className="skeleton h-16 w-3/4 mx-auto rounded-xl mb-4" />
          <div className="skeleton h-16 w-1/2 mx-auto rounded-xl mb-6" />
          <div className="skeleton h-6 w-2/3 mx-auto rounded-lg mb-10" />
          <div className="flex justify-center gap-4">
            <div className="skeleton h-12 w-40 rounded-full" />
            <div className="skeleton h-12 w-32 rounded-full" />
          </div>
        </section>

        {/* Cards Skeleton */}
        <section className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="skeleton w-12 h-12 rounded-xl" />
                <div className="flex-1">
                  <div className="skeleton h-6 w-1/3 rounded-lg mb-3" />
                  <div className="skeleton h-4 w-full rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
