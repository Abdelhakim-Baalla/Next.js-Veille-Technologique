export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-12 w-1/3"></div>
      <div className="skeleton h-6 w-2/3"></div>
      <div className="glass p-8 rounded-lg border border-border max-w-2xl">
        <div className="skeleton h-8 w-1/2 mb-6"></div>
        <div className="skeleton h-4 w-3/4 mb-6"></div>
        <div className="space-y-6">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
      </div>
    </div>
  )
}
