export default function PhotoLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="skeleton h-5 w-32 rounded mb-8" />

        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8">
          <div className="skeleton aspect-[16/9]" />
          <div className="p-8">
            <div className="flex gap-3 mb-4">
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-24 rounded" />
            </div>
            <div className="skeleton h-10 w-2/3 rounded-xl mb-4" />
            <div className="skeleton h-4 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
