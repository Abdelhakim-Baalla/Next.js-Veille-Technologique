export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-12 w-1/3"></div>
      <div className="skeleton h-6 w-2/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <div className="skeleton aspect-square rounded-lg"></div>
            <div className="skeleton h-5 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
