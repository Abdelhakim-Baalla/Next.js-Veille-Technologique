export default function PhotosLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="skeleton h-6 w-40 rounded-full mb-4" />
          <div className="skeleton h-12 w-64 rounded-xl mb-4" />
          <div className="skeleton h-4 w-full max-w-2xl rounded" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="skeleton aspect-[4/3]" />
              <div className="p-4">
                <div className="skeleton h-5 w-32 rounded mb-2" />
                <div className="skeleton h-4 w-20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
