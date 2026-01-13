export default function MarketingLoading() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="skeleton w-6 h-6 rounded-full" />
                <div className="skeleton h-5 w-32 rounded" />
              </div>
              <div className="skeleton h-4 w-full rounded mb-2" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-2xl p-6">
          <div className="skeleton h-6 w-32 rounded mb-4" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="skeleton h-48 rounded-lg" />
            <div className="skeleton h-48 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
