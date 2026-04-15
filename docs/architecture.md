# Architecture — Store E-Commerce Platform

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Next.js App  │  │  Zustand     │  │  Framer Motion    │  │
│  │  (React 18)   │  │  (State)     │  │  (Animations)     │  │
│  └──────┬───────┘  └──────┬───────┘  └───────────────────┘  │
│         │                  │                                  │
│  ┌──────┴──────────────────┴─────────┐                       │
│  │       Server Components (RSC)      │                       │
│  │       + Client Components          │                       │
│  └──────┬────────────────────────────┘                       │
└─────────┼───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server (Vercel)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  API Routes   │  │  Server      │  │  Middleware        │  │
│  │  /api/*       │  │  Actions     │  │  (Auth Guard)      │  │
│  └──────┬───────┘  └──────┬───────┘  └───────────────────┘  │
│         │                  │                                  │
│  ┌──────┴──────────────────┴─────────┐                       │
│  │     Supabase Client (Server)       │                       │
│  │     - anon key (public reads)      │                       │
│  │     - service role (admin writes)  │                       │
│  └──────┬────────────────────────────┘                       │
└─────────┼───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase (Backend)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  PostgreSQL   │  │  Storage     │  │  Auth (optional)   │  │
│  │  (Database)   │  │  (Images)    │  │                    │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐    │
│  │               Row Level Security (RLS)                │    │
│  │  - Public: SELECT on products, categories, settings   │    │
│  │  - Admin: ALL via service_role key                    │    │
│  └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Public User Flow
1. User visits page → Next.js Server Component renders with SSR
2. Server Component fetches data from Supabase using anon key
3. HTML sent to client with initial data
4. Client hydrates → Zustand stores initialize from localStorage
5. Interactive actions (add to cart, filters) handled client-side
6. Form submissions → API Routes → Supabase (service role for writes)

### Admin Flow
1. Admin clicks hidden button in footer → Login modal appears
2. Email validated client-side → Admin state saved in Zustand (persisted)
3. Navigate to /admin → Middleware checks admin state
4. Dashboard fetches all data via Supabase client
5. CRUD operations → API Routes → Supabase (service role key)
6. Image uploads → API Route → Supabase Storage

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR, routing, API routes |
| Language | TypeScript (strict) | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| Database | Supabase (PostgreSQL) | Data storage, RLS |
| Storage | Supabase Storage | Image hosting |
| State | Zustand | Client-side state management |
| Animation | Framer Motion | Page transitions, scroll animations |
| Forms | React Hook Form + Zod | Form handling + validation |
| Icons | Lucide React | SVG icon library |
| Hosting | Vercel | Deployment, CDN, serverless |
