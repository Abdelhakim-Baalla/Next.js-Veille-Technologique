export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-6 w-32"></div>
      <div className="glass p-8 rounded-lg border border-border">
        <div className="skeleton h-10 w-1/3 mb-4"></div>
        <div className="skeleton h-6 w-2/3 mb-6"></div>
        <div className="skeleton aspect-video rounded-lg"></div>
      </div>
    </div>
  )
}
