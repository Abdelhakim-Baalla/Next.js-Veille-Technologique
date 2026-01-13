export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Parallel Routes Skeleton */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-2xl p-6">
          <div className="skeleton h-4 w-24 rounded mb-4" />
          <div className="skeleton h-32 w-full rounded-xl" />
        </div>
        <div className="border border-gray-200 rounded-2xl p-6">
          <div className="skeleton h-4 w-24 rounded mb-4" />
          <div className="skeleton h-32 w-full rounded-xl" />
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="border border-gray-200 rounded-2xl p-6">
        <div className="skeleton h-6 w-1/3 rounded mb-4" />
        <div className="skeleton h-4 w-full rounded mb-2" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  )
}
