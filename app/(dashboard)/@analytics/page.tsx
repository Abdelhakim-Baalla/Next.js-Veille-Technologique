import { IconChart } from '../../components/icons'

// Simulated data fetching
async function getAnalyticsData() {
  // Simulate network delay to demonstrate loading state
  await new Promise((resolve) => setTimeout(resolve, 800))
  
  return {
    visitors: 12847,
    pageViews: 48293,
    bounceRate: 32.4,
    avgSession: '3m 24s',
  }
}

export default async function AnalyticsSlot() {
  const data = await getAnalyticsData()

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <IconChart className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold">Analytics Overview</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold">{data.visitors.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Visitors</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold">{data.pageViews.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Page Views</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold">{data.bounceRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Bounce Rate</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold">{data.avgSession}</p>
          <p className="text-xs text-gray-500 mt-1">Avg Session</p>
        </div>
      </div>

      {/* Mini Chart Visualization */}
      <div className="mt-4 flex items-end gap-1 h-16">
        {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-black rounded-t transition-all duration-300 hover:bg-gray-600"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}
