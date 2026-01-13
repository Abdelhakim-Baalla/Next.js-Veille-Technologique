/**
 * SERVER ACTIONS - Next.js 15
 * 
 * CONCEPT CLÉ : Server Actions
 * 
 * Les Server Actions permettent d'exécuter du code côté serveur directement
 * depuis les composants clients, sans avoir besoin de créer des API Routes.
 * 
 * DIRECTIVE 'use server' :
 * - Marque ce fichier comme contenant uniquement des Server Actions
 * - Toutes les fonctions exportées deviennent des Server Actions
 * - Alternative : Ajouter 'use server' au début d'une fonction individuelle
 * 
 * AVANTAGES :
 * 1. Type-safe : TypeScript fonctionne de bout en bout
 * 2. Pas d'API Routes : Pas besoin de créer /api/endpoints
 * 3. Sécurité : Le code s'exécute uniquement sur le serveur
 * 4. Simplicité : Appel direct depuis les composants clients
 * 
 * REVALIDATION DU CACHE :
 * - revalidatePath() : Invalide le cache pour un chemin spécifique
 * - revalidateTag() : Invalide le cache pour des tags spécifiques
 * - Utile après des mutations (POST, PUT, DELETE)
 * 
 * UTILISATION :
 * - Appeler depuis un Client Component avec useTransition()
 * - Gérer les états de chargement avec isPending
 * - Gérer les erreurs avec try/catch
 */

'use server'

import { revalidatePath } from 'next/cache'

export interface FormData {
  name: string
  email: string
  message: string
}

/**
 * Server Action pour soumettre le formulaire de contact
 * 
 * Cette fonction :
 * 1. S'exécute uniquement sur le serveur
 * 2. Valide les données
 * 3. Traite la soumission (simulation ici)
 * 4. Revalide le cache pour mettre à jour la page
 * 
 * @param formData - Les données du formulaire
 * @returns Un objet avec success et message/error
 */
export async function submitContactForm(formData: FormData) {
  // Simuler un traitement asynchrone (ex: sauvegarde en DB)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Validation côté serveur (toujours valider côté serveur !)
  if (!formData.name || !formData.email || !formData.message) {
    return {
      success: false,
      error: 'Tous les champs sont requis',
    }
  }

  // Dans une vraie application, on sauvegarderait ici :
  // await db.contact.create({ data: formData })
  // ou
  // await fetch('https://api.example.com/contact', { method: 'POST', body: JSON.stringify(formData) })
  console.log('Form submitted:', formData)

  // REVALIDATION DU CACHE
  // Après une mutation, on doit invalider le cache pour que Next.js
  // régénère la page avec les nouvelles données au prochain accès
  revalidatePath('/dashboard/contact')
  
  // Alternative : revalidateTag('contacts') si on utilise des tags

  return {
    success: true,
    message: 'Formulaire envoyé avec succès !',
  }
}
