import { IconUsers } from '../../components/icons'

// Simulated data fetching
async function getTeamData() {
  // Simulate network delay to demonstrate loading state
  await new Promise((resolve) => setTimeout(resolve, 1200))
  
  return [
    { id: 1, name: 'Sarah Chen', role: 'Lead Developer', status: 'online' },
    { id: 2, name: 'Alex Rivera', role: 'UI Designer', status: 'online' },
    { id: 3, name: 'Jordan Park', role: 'Backend Engineer', status: 'away' },
    { id: 4, name: 'Morgan Lee', role: 'DevOps', status: 'offline' },
  ]
}

export default async function TeamSlot() {
  const team = await getTeamData()

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-300',
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <IconUsers className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold">Team Members</h3>
        <span className="ml-auto px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
          {team.length}
        </span>
      </div>

      <div className="space-y-3">
        {team.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-medium text-sm">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{member.name}</p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>

            {/* Status */}
            <div className={`w-2.5 h-2.5 rounded-full ${statusColors[member.status as keyof typeof statusColors]}`} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Loaded independently via @team slot
        </p>
      </div>
    </div>
  )
}
