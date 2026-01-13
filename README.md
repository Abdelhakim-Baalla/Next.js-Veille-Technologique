# Next.js Routing Masterclass

A comprehensive demonstration of Next.js 15 App Router patterns and advanced routing concepts with a minimalist black and white design system.

## Overview

This project showcases all major routing features of Next.js 15 App Router:

- **Nested Layouts** - Hierarchical layout system with `layout.tsx`, `template.tsx`, and `page.tsx`
- **Route Groups** - Organize routes without affecting URL structure using `(marketing)` and `(dashboard)`
- **Parallel Routes** - Render multiple pages simultaneously with `@analytics` and `@team` slots
- **Intercepting Routes** - Modal patterns with `(.)photo/[id]` conventions
- **Loading States** - Streaming with `loading.tsx` and skeleton screens
- **Error Handling** - Granular error boundaries with `error.tsx` and `reset()` function
- **Not Found** - Custom 404 page with `not-found.tsx`
- **Server Actions** - Form handling with `'use server'` and `revalidatePath`
- **Middleware** - Route protection and authentication flows

## Project Structure

```
app/
├── layout.tsx              # Root Layout (required)
├── template.tsx            # Page transitions
├── page.tsx                # Home page
├── loading.tsx             # Loading UI
├── error.tsx               # Error boundary
├── not-found.tsx           # 404 page
├── actions.ts              # Server Actions
│
├── components/             # Shared components
│   ├── custom-cursor.tsx   # Custom cursor effect
│   ├── floating-shapes.tsx # Background animations
│   ├── navigation.tsx      # Main navigation
│   ├── logo.tsx            # Animated logo
│   └── icons.tsx           # Icon components
│
├── (dashboard)/            # Route Group
│   ├── layout.tsx          # Dashboard layout with parallel routes
│   ├── @analytics/         # Parallel Route slot
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── default.tsx
│   ├── @team/              # Parallel Route slot
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── default.tsx
│   └── dashboard/
│       ├── page.tsx
│       ├── loading.tsx
│       └── contact/        # Protected route
│           ├── page.tsx
│           ├── loading.tsx
│           └── contact-form.tsx
│
├── (marketing)/            # Route Group
│   └── marketing/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── loading.tsx
│       └── error.tsx
│
├── photos/                 # Photo gallery
│   ├── page.tsx
│   ├── loading.tsx
│   ├── [id]/               # Dynamic route
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   └── (.)photo/[id]/      # Intercepting route (modal)
│       └── page.tsx
│
└── login/                  # Authentication
    └── page.tsx

middleware.ts               # Route protection
```

## Key Concepts Demonstrated

### 1. Nested Layouts
Each route segment can have its own layout that wraps its children:
```typescript
// app/layout.tsx - Root Layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### 2. Route Groups
Organize routes without affecting URLs:
```
(dashboard)/dashboard/page.tsx → /dashboard
(marketing)/marketing/page.tsx → /marketing
```

### 3. Parallel Routes
Render multiple pages simultaneously:
```typescript
// app/(dashboard)/layout.tsx
export default function Layout({ children, analytics, team }) {
  return (
    <div>
      {analytics}  {/* @analytics/page.tsx */}
      {team}       {/* @team/page.tsx */}
      {children}   {/* page.tsx */}
    </div>
  )
}
```

### 4. Intercepting Routes
Show modals while preserving context:
```
photos/(.)photo/[id]/page.tsx  # Intercepts /photos/[id] from /photos
photos/[id]/page.tsx           # Full page for direct access
```

### 5. Loading States
Automatic loading UI with streaming:
```typescript
// loading.tsx - Skeleton screen
export default function Loading() {
  return <Skeleton />
}
```

### 6. Error Boundaries
Granular error handling:
```typescript
// error.tsx - Client Component
'use client'
export default function Error({ error, reset }) {
  return <button onClick={reset}>Try Again</button>
}
```

### 7. Server Actions
Form handling with revalidation:
```typescript
'use server'
import { revalidatePath } from 'next/cache'

export async function submitForm(formData: FormData) {
  // Process form...
  revalidatePath('/dashboard')
  return { success: true }
}
```

### 8. Middleware
Route protection at the edge:
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  if (!session) {
    return NextResponse.redirect('/login')
  }
}
```

## Design System

### Colors
- Background: `#ffffff` (white)
- Text: `#000000` (black)
- Secondary: `#666666` (gray)
- Borders: `#e0e0e0` (light gray)

### Typography
- Font: Space Grotesk
- Headings: Bold, tight tracking
- Body: Regular weight

### Visual Effects
- Custom cursor with mix-blend-mode
- Floating geometric shapes
- Animated particles
- Skeleton loading states
- Glass morphism navigation

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Navigation Flow

1. **Home** (`/`) - Overview of routing concepts
2. **Dashboard** (`/dashboard`) - Parallel routes demo
3. **Contact** (`/dashboard/contact`) - Protected route with Server Action
4. **Marketing** (`/marketing`) - Route group demo
5. **Photos** (`/photos`) - Intercepting routes demo
6. **Login** (`/login`) - Authentication demo

## Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Space Grotesk font

## License

MIT
