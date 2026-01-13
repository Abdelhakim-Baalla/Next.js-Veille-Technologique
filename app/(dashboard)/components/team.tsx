/**
 * TEAM COMPONENT - SERVER COMPONENT
 * 
 * Ce composant remplace le slot @team pour éviter les conflits
 * avec les Route Groups. Il fonctionne de la même manière mais sans
 * utiliser les Parallel Routes.
 */

async function getTeam() {
  // Simuler un fetch de données
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return [
    { id: 1, name: 'Alice Martin', role: 'Développeuse' },
    { id: 2, name: 'Bob Dupont', role: 'Designer' },
    { id: 3, name: 'Claire Bernard', role: 'Product Manager' },
  ]
}

export default async function Team() {
  const team = await getTeam()

  return (
    <div className="space-y-3">
      {team.map((member) => (
        <div
          key={member.id}
          className="flex justify-between items-center p-3 bg-accent/30 rounded border border-border/30"
        >
          <div>
            <p className="font-medium">{member.name}</p>
            <p className="text-sm text-foreground/60">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
