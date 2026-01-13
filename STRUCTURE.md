# Structure de l'Application Next.js Routing Masterclass

## Architecture des Routes

```
app/
├── layout.tsx                    # Root Layout (obligatoire avec <html> et <body>)
├── template.tsx                  # Template pour animations de transition
├── page.tsx                      # Page d'accueil
├── loading.tsx                   # Loading global avec Skeleton
├── error.tsx                     # Error Boundary global
├── not-found.tsx                 # Page 404 personnalisée
├── globals.css                   # Styles globaux avec Tailwind
├── actions.ts                    # Server Actions
│
├── (marketing)/                  # Route Group (n'affecte pas l'URL)
│   ├── layout.tsx
│   ├── page.tsx                  # Accessible via /marketing
│   ├── loading.tsx
│   └── error.tsx
│
├── (dashboard)/                  # Route Group
│   ├── layout.tsx                # Layout avec Parallel Routes slots
│   ├── page.tsx                  # Accessible via /dashboard
│   ├── loading.tsx
│   ├── error.tsx
│   │
│   ├── @analytics/               # Parallel Route Slot
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── default.tsx
│   │
│   ├── @team/                    # Parallel Route Slot
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── default.tsx
│   │
│   ├── photos/
│   │   ├── page.tsx              # Galerie photos
│   │   ├── loading.tsx
│   │   │
│   │   ├── [id]/
│   │   │   ├── page.tsx          # Page détail photo
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   │
│   │   └── (.)photo/             # Intercepting Route
│   │       └── [id]/
│   │           └── page.tsx      # Modale de prévisualisation
│   │
│   └── contact/
│       ├── page.tsx              # Page avec Server Action
│       ├── contact-form.tsx      # Client Component avec formulaire
│       └── loading.tsx
│
└── login/
    └── page.tsx                  # Page de connexion

middleware.ts                      # Protection de routes dashboard
```

## Concepts Implémentés

### 1. Route Groups
- `(marketing)` et `(dashboard)` : Organisation du code sans affecter l'URL
- Chaque groupe a son propre layout

### 2. Parallel Routes
- Slots `@analytics` et `@team` rendus simultanément
- Chaque slot a son propre loading et error boundary
- Fichiers `default.tsx` pour gérer les cas où un slot n'existe pas

### 3. Intercepting Routes
- `(.)photo/[id]` intercepte les routes vers `/dashboard/photos/[id]`
- Affiche une modale tout en gardant la galerie visible en arrière-plan

### 4. Streaming & Loading States
- Fichiers `loading.tsx` à chaque niveau avec Skeleton Screens
- Utilisation de `animate-pulse` de Tailwind

### 5. Error Boundaries
- Fichiers `error.tsx` Client Components avec fonction `reset()`
- Gestion d'erreurs granulaires par segment de route

### 6. Server Actions
- `actions.ts` avec directive `'use server'`
- Revalidation du cache avec `revalidatePath()`
- Utilisation dans un Client Component avec `useTransition()`

### 7. Middleware
- Protection des routes `/dashboard/*`
- Redirection vers `/login` si cookie de session absent
- Préservation de l'URL de destination avec query param `redirect`

### 8. Design System
- Fond noir pur (#000000)
- Texte blanc cassé (#F5F5F7)
- Glassmorphism avec `backdrop-blur`
- Bordures ultra-fines (1px)
- Typographie Inter
