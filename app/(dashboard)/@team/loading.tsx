export default function TeamLoading() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="skeleton w-5 h-5 rounded" />
        <div className="skeleton h-5 w-28 rounded" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="skeleton w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="skeleton h-4 w-24 rounded mb-2" />
              <div className="skeleton h-3 w-16 rounded" />
            </div>
            <div className="skeleton w-2.5 h-2.5 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
