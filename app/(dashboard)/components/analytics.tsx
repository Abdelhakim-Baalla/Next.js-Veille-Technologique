/**
 * ANALYTICS COMPONENT - SERVER COMPONENT
 * 
 * Ce composant remplace le slot @analytics pour éviter les conflits
 * avec les Route Groups. Il fonctionne de la même manière mais sans
 * utiliser les Parallel Routes.
 */

async function getAnalytics() {
  // Simuler un fetch de données
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    visitors: 12450,
    pageViews: 34200,
    bounceRate: 32.5,
  }
}

export default async function Analytics() {
  const analytics = await getAnalytics()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-foreground/60">Visiteurs</span>
          <span className="text-2xl font-medium">{analytics.visitors.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-foreground/60">Vues</span>
          <span className="text-2xl font-medium">{analytics.pageViews.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-foreground/60">Taux de rebond</span>
          <span className="text-2xl font-medium">{analytics.bounceRate}%</span>
        </div>
      </div>
    </div>
  )
}
