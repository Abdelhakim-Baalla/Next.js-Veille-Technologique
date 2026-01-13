# Next.js Routing Masterclass 🚀

Application de démonstration professionnelle illustrant les concepts avancés du routage Next.js 15.

## 🎯 Objectifs de la Veille

1. **Maîtriser l'architecture App Router** : Comprendre la hiérarchie `layout.tsx`, `template.tsx`, `page.tsx`
2. **Implémenter des patterns UI avancés** : Parallel Routes, Intercepting Routes
3. **Gérer les états de chargement et d'erreur** de manière granulaire (`loading.tsx`, `error.tsx`)
4. **Optimiser la navigation** avec les Server Actions et le Middleware
5. **Distinguer Server vs Client Components** dans le contexte du routing

## ✨ Fonctionnalités

- ✅ **Route Groups** : Organisation avec (marketing) et (dashboard)
- ✅ **Parallel Routes** : Slots @analytics et @team avec rendu simultané
- ✅ **Intercepting Routes** : Modales de prévisualisation sans perdre le contexte
- ✅ **Streaming** : Loading states granulaires avec Skeleton Screens
- ✅ **Error Boundaries** : Gestion d'erreurs isolée par segment
- ✅ **Server Actions** : Actions côté serveur avec revalidation du cache
- ✅ **Middleware** : Protection de routes avec redirection conditionnelle
- ✅ **Design Premium** : Thème sombre professionnel avec glassmorphism

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

L'application sera accessible sur `http://localhost:3389`

## 📚 Pages Principales

- **/** : Page d'accueil avec vue d'ensemble
- **/presentation** : Page de présentation pédagogique complète
- **/marketing** : Démonstration des Route Groups
- **/dashboard** : Démonstration des Parallel Routes
- **/dashboard/photos** : Démonstration des Intercepting Routes
- **/dashboard/contact** : Démonstration des Server Actions
- **/login** : Page de connexion (démo du Middleware)

## 📖 Documentation

- **PRESENTATION_GUIDE.md** : Guide complet pour la présentation avec explications détaillées
- **STRUCTURE.md** : Documentation de l'architecture de l'application

## 🎨 Design System

- **Fond** : Noir pur (#000000)
- **Texte** : Blanc cassé (#F5F5F7)
- **Accents** : Gris sidéral (#1C1C1E)
- **Bordures** : Ultra-fines (1px)
- **Typographie** : Inter (Google Fonts)
- **Effets** : Glassmorphism, animations subtiles, gradients

## 🛠️ Technologies

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling utility-first
- **React 18** : Bibliothèque UI

## 📝 Structure

```
app/
├── layout.tsx              # Root Layout
├── template.tsx            # Template pour transitions
├── page.tsx                # Page d'accueil
├── (marketing)/            # Route Group
├── (dashboard)/            # Route Group avec Parallel Routes
│   ├── @analytics/        # Parallel Slot
│   ├── @team/             # Parallel Slot
│   └── photos/
│       └── (.)photo/      # Intercepting Route
└── presentation/          # Page de présentation
```

## 🎓 Pour la Présentation

Consultez le fichier **PRESENTATION_GUIDE.md** pour :
- Structure de présentation recommandée
- Explications détaillées de chaque concept
- Points clés à mettre en avant
- Exemples de code commentés

## 📚 Ressources

- [Documentation Next.js 15](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

Créé pour une veille technologique sur Next.js 15 Routing 🎯
