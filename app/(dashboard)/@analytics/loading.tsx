export default function AnalyticsLoading() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="skeleton w-5 h-5 rounded" />
        <div className="skeleton h-5 w-32 rounded" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-xl">
            <div className="skeleton h-8 w-20 rounded mb-2" />
            <div className="skeleton h-3 w-16 rounded" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-end gap-1 h-16">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div
            key={i}
            className="flex-1 skeleton rounded-t"
            style={{ height: `${Math.random() * 60 + 20}%` }}
          />
        ))}
      </div>
    </div>
  )
}
