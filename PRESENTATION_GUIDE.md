# Guide de Présentation - Next.js Routing Masterclass

## 🎯 Objectifs de la Veille Technologique

Cette application de démonstration a été créée pour maîtriser les concepts avancés du routage Next.js 15. Les objectifs sont :

1. **Maîtriser l'architecture App Router** : Comprendre la hiérarchie `layout.tsx`, `template.tsx`, `page.tsx`
2. **Implémenter des patterns UI avancés** : Parallel Routes, Intercepting Routes
3. **Gérer les états de chargement et d'erreur** de manière granulaire (`loading.tsx`, `error.tsx`)
4. **Optimiser la navigation** avec les Server Actions et le Middleware
5. **Distinguer Server vs Client Components** dans le contexte du routing

---

## 📚 Concepts à Expliquer

### 1. Architecture App Router

#### Hiérarchie des Fichiers

```
app/
├── layout.tsx      # Layout racine (obligatoire avec <html> et <body>)
├── template.tsx    # Template pour animations de transition
├── page.tsx        # Page d'accueil
├── loading.tsx     # UI de chargement global
├── error.tsx       # Error Boundary global
└── not-found.tsx   # Page 404 personnalisée
```

#### Points Clés à Expliquer :

- **layout.tsx** : 
  - Définit le layout partagé pour un segment et tous ses enfants
  - Reste monté lors de la navigation (état préservé)
  - Parfait pour les navigations, headers, footers

- **template.tsx** :
  - Similaire à layout mais recrée les composants à chaque navigation
  - Utile pour les animations de transition
  - Les états sont réinitialisés

- **page.tsx** :
  - Composant unique qui rend la page pour cette route
  - Peut être un Server Component (par défaut) ou Client Component

- **loading.tsx** :
  - Affiche un UI pendant le streaming des données
  - Utilise des Skeleton Screens pour une meilleure UX
  - S'affiche automatiquement pendant les chargements

- **error.tsx** :
  - Error Boundary pour gérer les erreurs
  - Doit être un Client Component
  - Fonction `reset()` pour réessayer

---

### 2. Route Groups

#### Concept

Les Route Groups permettent d'organiser les routes en groupes logiques **sans modifier l'URL**.

#### Syntaxe

```
app/
  (marketing)/
    layout.tsx
    page.tsx      → Accessible via /marketing (pas /(marketing))
  (dashboard)/
    layout.tsx
    page.tsx      → Accessible via /dashboard
```

#### Points Clés :

- Les parenthèses `()` indiquent un Route Group
- N'apparaît **pas** dans l'URL finale
- Permet d'avoir des layouts différents pour différentes sections
- Organisation logique du code

#### Exemple dans le Code

```typescript
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return (
    <div>
      <nav>Navigation Marketing</nav>
      {children}
    </div>
  )
}
```

---

### 3. Parallel Routes

#### Concept

Les Parallel Routes permettent de rendre **plusieurs pages simultanément** dans le même layout.

#### Syntaxe

```
app/
  (dashboard)/
    layout.tsx          # Reçoit les props @analytics et @team
    @analytics/
      page.tsx          # Slot analytics
      loading.tsx       # Loading spécifique
      error.tsx         # Error boundary spécifique
    @team/
      page.tsx          # Slot team
      loading.tsx
      error.tsx
```

#### Points Clés :

- Syntaxe : `@nom-du-slot` pour créer un slot
- Chaque slot charge **indépendamment**
- Chaque slot peut avoir son propre `loading.tsx` et `error.tsx`
- Une erreur dans un slot n'affecte **pas** les autres
- `default.tsx` pour gérer les cas où un slot n'existe pas

#### Exemple dans le Code

```typescript
// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
  analytics,  // Slot @analytics
  team,      // Slot @team
}: {
  children: ReactNode
  analytics: ReactNode
  team: ReactNode
}) {
  return (
    <>
      {children}
      <div>{analytics}</div>
      <div>{team}</div>
    </>
  )
}
```

#### Avantages :

1. **Rendu simultané** : Les slots chargent en parallèle
2. **Isolation** : Erreurs isolées par slot
3. **Performance** : Streaming indépendant
4. **UX** : Feedback visuel granulaire

---

### 4. Intercepting Routes

#### Concept

Les Intercepting Routes permettent d'**intercepter** une route et d'afficher une modale tout en gardant le contexte.

#### Syntaxe

```
app/
  photos/
    [id]/
      page.tsx           # Route normale : /photos/1
    (.)photo/            # Intercepting route (même niveau)
      [id]/
        page.tsx         # Modale : intercepte /photos/1
```

#### Conventions :

- `(.)` : Intercepter au même niveau
- `(..)` : Intercepter un niveau au-dessus
- `(..)(..)` : Intercepter deux niveaux au-dessus
- `(...)` : Intercepter depuis la racine

#### Points Clés :

- Utile pour les modales et prévisualisations
- La route originale reste accessible
- Parfait pour les UX modernes (Instagram, Twitter)
- Navigation arrière ferme la modale

#### Exemple dans le Code

```typescript
// app/(dashboard)/photos/(.)photo/[id]/page.tsx
'use client'

export default function PhotoModal({ params }) {
  const router = useRouter()
  
  return (
    <div className="fixed inset-0 z-50" onClick={() => router.back()}>
      <img src={photoUrl} />
    </div>
  )
}
```

---

### 5. Streaming & Loading States

#### Concept

Next.js 15 permet le **streaming** de données avec des états de chargement granulaires.

#### Fichiers Loading

```
app/
  dashboard/
    loading.tsx         # Loading pour /dashboard
    @analytics/
      loading.tsx       # Loading spécifique pour analytics
    @team/
      loading.tsx       # Loading spécifique pour team
```

#### Points Clés :

- `loading.tsx` : Affiche un UI pendant le chargement
- Skeleton Screens : Placeholders animés
- Streaming : Chargement progressif des données
- Meilleure UX avec feedback visuel immédiat

#### Exemple

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-accent rounded w-1/2 mb-4" />
      <div className="h-4 bg-accent rounded w-full" />
    </div>
  )
}
```

---

### 6. Error Boundaries

#### Concept

Les Error Boundaries permettent de gérer les erreurs de manière **granulaire** à chaque niveau de route.

#### Fichiers Error

```
app/
  error.tsx            # Error global
  dashboard/
    error.tsx          # Error pour dashboard
    @analytics/
      error.tsx        # Error spécifique pour analytics
```

#### Points Clés :

- `error.tsx` : **Doit** être un Client Component
- Fonction `reset()` : Permet de réessayer
- Isolation : Erreur limitée au segment concerné
- Meilleure résilience de l'application

#### Exemple

```typescript
// app/dashboard/error.tsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Une erreur est survenue</h2>
      <button onClick={reset}>Réessayer</button>
    </div>
  )
}
```

---

### 7. Server Actions

#### Concept

Les Server Actions permettent d'exécuter du code côté serveur directement depuis les composants clients.

#### Syntaxe

```typescript
// app/actions.ts
'use server'

export async function submitForm(data: FormData) {
  // Code côté serveur
  await db.save(data)
  revalidatePath('/dashboard')
  return { success: true }
}
```

#### Points Clés :

- Directive `'use server'` : Marque une fonction comme Server Action
- Revalidation : `revalidatePath()` pour mettre à jour le cache
- Pas besoin d'API Routes
- Type-safe avec TypeScript

#### Utilisation

```typescript
// Client Component
'use client'

import { useTransition } from 'react'
import { submitForm } from '@/app/actions'

export default function Form() {
  const [isPending, startTransition] = useTransition()
  
  const handleSubmit = (e) => {
    startTransition(async () => {
      const result = await submitForm(formData)
    })
  }
}
```

---

### 8. Middleware

#### Concept

Le Middleware s'exécute **avant** chaque requête et permet de protéger des routes ou de rediriger.

#### Syntaxe

```typescript
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.cookies.get('session')) {
    return NextResponse.redirect('/login')
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

#### Points Clés :

- S'exécute sur Edge Runtime (rapide)
- S'exécute **avant** le rendu
- Peut accéder aux cookies, headers
- Peut rediriger ou réécrire les requêtes

---

### 9. Server vs Client Components

#### Server Components (Par Défaut)

**Caractéristiques :**
- ✅ Rendu sur le serveur
- ✅ Accès direct aux données (fetch, DB)
- ✅ Pas de JavaScript côté client
- ✅ Meilleures performances
- ❌ Pas d'état local (useState)
- ❌ Pas d'effets (useEffect)
- ❌ Pas d'event handlers (onClick)

**Quand utiliser :**
- Fetch de données
- Accès à la base de données
- Accès aux variables d'environnement
- Composants statiques

#### Client Components

**Caractéristiques :**
- ✅ Directive `'use client'` obligatoire
- ✅ Interactivité (onClick, useState, etc.)
- ✅ Hooks React (useState, useEffect)
- ✅ Event listeners
- ❌ JavaScript envoyé au client
- ❌ Pas d'accès direct aux données

**Quand utiliser :**
- Formulaires
- Interactivité
- State management
- Event handlers
- Error Boundaries (error.tsx)

---

## 🎤 Structure de Présentation Recommandée

### 1. Introduction (5 min)
- Présenter Next.js 15 et l'App Router
- Expliquer les objectifs de la veille
- Montrer la page d'accueil

### 2. Architecture App Router (10 min)
- Expliquer la hiérarchie layout.tsx, template.tsx, page.tsx
- Montrer les fichiers loading.tsx et error.tsx
- Naviguer vers /dashboard pour montrer le streaming

### 3. Route Groups (5 min)
- Expliquer le concept
- Montrer la structure (marketing) et (dashboard)
- Naviguer vers /marketing

### 4. Parallel Routes (10 min)
- Expliquer le concept avec le diagramme
- Montrer les slots @analytics et @team
- Expliquer comment ils chargent indépendamment
- Montrer les loading states par slot

### 5. Intercepting Routes (10 min)
- Expliquer le concept
- Naviguer vers /dashboard/photos
- Cliquer sur une photo pour montrer la modale
- Expliquer que la galerie reste visible

### 6. Server Actions (5 min)
- Expliquer le concept
- Naviguer vers /dashboard/contact
- Soumettre le formulaire
- Expliquer la revalidation

### 7. Middleware (5 min)
- Expliquer le concept
- Se déconnecter (supprimer le cookie)
- Essayer d'accéder à /dashboard
- Montrer la redirection vers /login

### 8. Server vs Client Components (5 min)
- Expliquer la différence
- Montrer des exemples dans le code
- Expliquer quand utiliser chacun

### 9. Questions & Conclusion (5 min)

---

## 🚀 Commandes pour Démarrer

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Production
npm start
```

---

## 📝 Points à Mettre en Avant

1. **Performance** : Streaming, Server Components, Edge Runtime
2. **UX** : Loading states granulaires, Error boundaries isolées
3. **Développeur** : Type-safe, organisation claire, patterns réutilisables
4. **Modernité** : Patterns utilisés par les grandes applications (Instagram, Twitter)

---

## 🎨 Design System

- **Fond** : Noir pur (#000000)
- **Texte** : Blanc cassé (#F5F5F7)
- **Accents** : Gris sidéral (#1C1C1E)
- **Bordures** : Ultra-fines (1px)
- **Typographie** : Inter
- **Effets** : Glassmorphism, animations subtiles

---

## 📚 Ressources

- [Documentation Next.js 15](https://nextjs.org/docs)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

Bonne présentation ! 🎉
