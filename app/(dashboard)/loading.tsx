export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="skeleton h-12 w-1/3"></div>
          <div className="skeleton h-6 w-2/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {[1, 2].map((i) => (
              <div key={i} className="glass p-6 rounded-lg border border-border">
                <div className="skeleton h-8 w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-5/6"></div>
                  <div className="skeleton h-4 w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
