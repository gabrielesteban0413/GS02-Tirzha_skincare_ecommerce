# Tirzha Skincare Ecommerce

Advanced ecommerce platform for skincare products built with modern architecture principles and enterprise-grade technologies.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

---

## Overview

Tirzha is a full-stack ecommerce application designed for skincare product sales. The platform implements Clean Architecture principles to ensure maintainability, scalability, and separation of concerns across all layers.

**Key Features:**
- Product catalog with advanced filtering (by type, category, solution)
- Shopping cart management with real-time updates
- User authentication and profiles
- Order management system
- Skincare routine templates
- Responsive design for mobile and desktop

---

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Language:** TypeScript 5.8.2
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma 5.22.0 ORM
- **Dependency Injection:** tsyringe 4.10.0
- **Validation:** class-validator, class-transformer
- **Package Manager:** pnpm 11.5.1

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18.2.0
- **Language:** TypeScript 6.0.3
- **State Management:** 
  - React Query 5.101.0 (server state)
  - Zustand 5.0.14 (client state)
- **HTTP Client:** axios 1.17.0
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm 11.5.1

### Monorepo
- **Workspace:** pnpm workspaces
- **Build System:** Turbo
- **Shared Packages:**
  - `@skincare/api-types` - API interfaces
  - `@skincare/config` - Shared configurations
  - `@skincare/core` - Domain logic
  - `@skincare/shared-utils` - Utility functions
  - `@skincare/ui-kit` - Reusable components

---

## Architecture

### Clean Architecture Implementation

The application follows Clean Architecture principles with strict layering:

```
Domain Layer
    ├── Entities (User, Product, Order, Cart, Routine)
    ├── Value Objects (Money, Email, Stock, Address)
    ├── Ports (Repository interfaces)
    └── Errors (Domain-specific exceptions)
         ↓
Application Layer
    ├── Use Cases (Business logic orchestration)
    ├── DTOs (Data validation)
    └── Service interfaces
         ↓
Infrastructure Layer
    ├── Database (Prisma models & mappers)
    ├── External Services (Payment, Email)
    ├── Dependency Injection
    └── Cache management
         ↓
Presentation Layer
    ├── Controllers (HTTP request handling)
    ├── Routes
    └── Middleware
```

### Frontend Architecture

```
Frontend Layer Structure
    ├── App (Next.js routing)
    ├── Components (Reusable UI components)
    ├── Hooks (React Query + Zustand)
    ├── Infrastructure
    │   ├── API clients (axios instances)
    │   └── React Query setup
    ├── Stores (Zustand state)
    └── Data (Constants & fixtures)
```

### State Management Strategy

- **Server State (React Query):** API data, products, orders, user data
- **Client State (Zustand):** Authentication, UI toggles (modals, menus)
- **Persistence:** LocalStorage for auth tokens and UI preferences

---

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── domain/              # Business rules & entities
│   │   │   ├── entities/
│   │   │   ├── value-objects/
│   │   │   ├── ports/           # Repository interfaces
│   │   │   └── errors/          # Domain exceptions
│   │   ├── application/         # Use cases & DTOs
│   │   │   ├── product/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── order/
│   │   │   └── routine/
│   │   ├── infrastructure/      # Database, DI, external services
│   │   │   ├── database/
│   │   │   ├── di/              # Dependency container
│   │   │   ├── cache/
│   │   │   ├── email/
│   │   │   └── payment/
│   │   └── presentation/        # HTTP layer
│   │       ├── controllers/
│   │       ├── middlewares/
│   │       ├── routes/
│   │       └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js routes (App Router)
│   │   │   ├── (auth)/
│   │   │   ├── (shop)/
│   │   │   ├── (info)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/          # React components
│   │   │   ├── product/
│   │   │   ├── cart/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── hooks/               # React Query & Zustand hooks
│   │   ├── infrastructure/      # API clients
│   │   ├── stores/              # Zustand stores
│   │   ├── data/                # Constants & fixtures
│   │   └── styles/
│   ├── public/
│   └── package.json
│
├── packages/
│   ├── api-types/               # Shared TypeScript types
│   ├── config/                  # ESLint, Jest, tsconfig
│   ├── core/                    # Shared domain logic
│   ├── shared-utils/            # Utility functions
│   └── ui-kit/                  # Reusable components
│
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.web
│   └── docker-compose.yml
│
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm 11.x or later
- PostgreSQL 14+
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd GS02-Tirzha_skincare_ecommerce

# Install dependencies
pnpm install

# Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Configure DATABASE_URL in backend/.env
# DATABASE_URL=postgresql://user:password@localhost:5432/tirzha_db
```

### Environment Variables

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/tirzha_db
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Development

### Start Development Servers

```bash
# Terminal 1: Backend
cd backend
pnpm dev

# Terminal 2: Frontend
cd frontend
pnpm dev
```

Backend runs on `http://localhost:3001`  
Frontend runs on `http://localhost:3000`

### Database Setup

```bash
# Apply migrations
cd backend
pnpm exec prisma migrate dev

# Seed database with initial data
pnpm exec prisma db seed
```

### Available Commands

**Backend:**
```bash
pnpm dev         # Start development server
pnpm build       # Compile TypeScript
pnpm start       # Run production build
pnpm test        # Run tests
pnpm lint        # Run ESLint
```

**Frontend:**
```bash
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm start       # Run production server
pnpm lint        # Run ESLint
```

**Root (Monorepo):**
```bash
pnpm install     # Install all dependencies
pnpm build       # Build all packages
pnpm dev         # Start all dev servers
pnpm lint        # Lint all packages
```

---

## Production Build

### Build Process

```bash
# Build entire monorepo
pnpm build

# Verify builds
ls backend/dist
ls frontend/.next
```

### Build Output

- **Backend:** `backend/dist/` - Compiled JavaScript
- **Frontend:** `frontend/.next/` - Next.js optimized build

### Environment for Production

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://user:password@your-host:5432/tirzha_db
NODE_ENV=production
PORT=3001
JWT_SECRET=generate-secure-random-string
```

**Frontend** (`frontend/.env.production`):
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

---

## Deployment

### Option 1: Deploy to Vercel (Recommended for Next.js)

Vercel is optimized for Next.js deployments and provides the best experience.

**Steps:**

1. **Connect Repository:**
   ```bash
   # Push code to GitHub
   git push origin main
   ```

2. **Import Project to Vercel:**
   - Visit https://vercel.com/new
   - Select your GitHub repository
   - Select `frontend` as root directory
   - Configure environment variables

3. **Configure Build Settings:**
   - Build Command: `cd ../.. && pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Deploy Backend:**
   - For API, use Railway, Render, or any Node.js hosting
   - Configure `NEXT_PUBLIC_API_URL` to point to your backend

**Vercel Configuration** (`frontend/vercel.json`):
```json
{
  "buildCommand": "cd ../.. && pnpm install && pnpm build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@next_public_api_url"
  }
}
```

### Option 2: Deploy to Netlify (Requires Configuration)

Netlify needs special configuration for Next.js due to SSR and dynamic routes.

**Alternative: Use Netlify Functions + Static Export (NOT Recommended):**

This would require removing SSR capabilities, which is not ideal.

**Better: Configure as Full-Stack with Node Runtime:**

1. **Create `netlify.toml`:**

```toml
[build]
  command = "cd ../.. && pnpm install && pnpm build"
  functions = "backend/dist"
  publish = "frontend/.next"

[dev]
  command = "pnpm dev"
  port = 3000

[context.production]
  environment = { NODE_ENV = "production" }

# Redirect all unmatched routes to index for client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Known Issue with Netlify:**
Netlify historically has issues with Next.js SSR. The 404 error occurs because:
- Dynamic routes need server-side rendering
- Netlify's default static hosting can't handle SSR
- Solution: Use Vercel instead, or deploy backend and frontend separately

### Option 3: Deploy Frontend to Netlify + Backend Separately

**Frontend on Netlify (as static build):**

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "frontend/.next/static"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Backend on Railway/Render:**
- Push backend to separate repository
- Deploy to Railway (https://railway.app) or Render (https://render.com)
- Configure frontend API URL to point to backend

### Option 4: Docker Deployment

**Build Docker Images:**
```bash
cd docker
docker-compose build
docker-compose up
```

**Deploy to Cloud:**
- Google Cloud Run
- AWS ECS
- Azure Container Instances
- DigitalOcean App Platform

---

## API Documentation

### Base URL
```
Production: https://api.tirzha.com
Development: http://localhost:3001/api
```

### Product Endpoints

**Get products by type:**
```
GET /api/products/type/:type
```

**Get products by solution:**
```
GET /api/products/solution/:solution
```

**Get product by slug:**
```
GET /api/products/:slug
```

### Response Format

**Success Response:**
```json
{
  "data": { /* entity data */ },
  "code": "SUCCESS"
}
```

**Error Response:**
```json
{
  "code": "PRODUCT_NOT_FOUND",
  "message": "Product not found",
  "statusCode": 404
}
```

---

## Architecture Decisions

### Why Clean Architecture?

- **Testability:** Each layer can be tested independently
- **Maintainability:** Clear separation of concerns
- **Scalability:** Easy to add new features without affecting existing code
- **Flexibility:** Easy to swap implementations (e.g., database, payment provider)

### Why React Query + Zustand?

- **React Query:** Eliminates complex server state management
- **Zustand:** Lightweight and performant for client state
- **Separation:** Clear distinction between server and client state

### Why Monorepo?

- **Code Sharing:** Common types and utilities across packages
- **Consistency:** Unified dependency versions
- **Easier Refactoring:** Change shared code in one place
- **Better Developer Experience:** Single workspace setup

---

## Performance Considerations

- **Query Caching:** React Query caches responses for 5 minutes
- **Lazy Loading:** Components load only when needed
- **Image Optimization:** Next.js automatic image optimization
- **Database Indexing:** Indexes on commonly filtered fields
- **API Rate Limiting:** Prevent abuse and ensure stability

---

## Security

- **Password Hashing:** bcrypt for secure password storage
- **JWT Tokens:** Stateless authentication
- **CORS:** Configured for frontend domain only
- **Input Validation:** DTOs with class-validator
- **SQL Injection Prevention:** Prisma parameterized queries
- **HTTPS Only:** Required for production

---

## Troubleshooting

### Netlify 404 Error

**Problem:** Pages return 404 after deployment to Netlify

**Root Cause:** Next.js requires server-side rendering for dynamic routes; Netlify's default hosting is static-only

**Solutions (in order of recommendation):**

1. **Use Vercel** (Best) - Built for Next.js
2. **Deploy separately:**
   - Frontend: Netlify (static export)
   - Backend: Railway, Render, or Heroku
3. **Use Docker** - Deploy both frontend and backend as containers

### Database Connection Issues

```bash
# Verify DATABASE_URL format
postgresql://user:password@host:port/database

# Test connection
cd backend
pnpm exec prisma db execute --stdin < /dev/null
```

### Build Failures

```bash
# Clear cache and rebuild
pnpm install
pnpm build --force

# Check Node version
node --version  # Should be 18+
```

---

## Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "Add feature description"`
3. Push branch: `git push origin feature/feature-name`
4. Create Pull Request with description

---

## License

Proprietary - All rights reserved

---

## Support

For issues or questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include error logs and reproduction steps

---

**Last Updated:** June 2026  
**Version:** 1.0.0
