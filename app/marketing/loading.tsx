export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <div className="skeleton h-16 w-1/2"></div>
          <div className="skeleton h-6 w-3/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="skeleton h-8 w-1/2"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
