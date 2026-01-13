export default function ContactLoading() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="skeleton h-6 w-32 rounded-full mb-4" />
        <div className="skeleton h-8 w-48 rounded mb-3" />
        <div className="skeleton h-4 w-full rounded" />
      </div>

      <div className="border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="skeleton w-10 h-10 rounded-lg" />
          <div>
            <div className="skeleton h-5 w-32 rounded mb-2" />
            <div className="skeleton h-3 w-48 rounded" />
          </div>
        </div>

        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="skeleton h-4 w-16 rounded mb-2" />
              <div className="skeleton h-12 w-full rounded-xl" />
            </div>
          ))}
          <div className="skeleton h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  )
}
