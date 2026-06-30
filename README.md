# Tirzah Skincare Ecommerce

Plataforma ecommerce de skincare en monorepo con arquitectura limpia y separada por capas.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Tirzah Skincare es una aplicación full-stack para comercio electrónico, diseñada con principios de Clean Architecture y separando claramente las capas de dominio, aplicación, infraestructura y presentación.

**Highlights:**
- Navegación de `tratamientos` con categorías claras y específicas
- Carrito persistente con actualizaciones en tiempo real
- Frontend construido con Next.js App Router y React Query
- Backend con Express y Prisma
- Monorepo con paquetes compartidos para tipos, configuración y lógica de dominio

---

## Technology Stack

### Backend
- **Runtime:** Node.js 18+
- **Language:** TypeScript 5.8.2
- **Server:** Express.js
- **Database:** PostgreSQL con Prisma 5.22.0
- **Dependency Injection:** tsyringe
- **Validation:** class-validator, class-transformer
- **Package Manager:** pnpm 10.17.0

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Library:** React 18.2.0
- **Language:** TypeScript 6.0.3
- **State Management:** React Query 5.101.0, Zustand 5.0.14
- **HTTP Client:** axios 1.17.0
- **Styling:** Tailwind CSS

### Monorepo
- **Workspace:** pnpm workspaces
- **Build System:** Turbo 1.10.0
- **Shared Packages:**
  - `@skincare/api-types`
  - `@skincare/config`
  - `@skincare/core`
  - `@skincare/shared-utils`
  - `@skincare/ui-kit`

---

## Architecture

### Clean Architecture Layers

```
Domain Layer
  ├── Entities
  ├── Value Objects
  ├── Ports
  └── Errors

Application Layer
  ├── Use Cases
  ├── DTOs
  └── Orchestration

Infrastructure Layer
  ├── Database
  ├── API clients
  ├── External services
  └── Dependency injection

Presentation Layer
  ├── Controllers / Routes
  ├── Middleware
  └── UI + Pages
```

### Frontend Layer

```
frontend/src/
  ├── app/            # Next.js routing
  ├── components/     # UI components
  ├── hooks/          # React Query + Zustand hooks
  ├── infrastructure/ # API clients
  ├── stores/         # Zustand state
  ├── data/           # Fixtures / constants
  └── styles/
```

### State Strategy

- **Server state:** React Query para API y datos persistentes
- **Client state:** Zustand para UI y estado local
- **Persistence:** carrito en LocalStorage y datos de sesión cuando aplica

---

## Project Structure

```
.
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── infrastructure/
│   │   ├── stores/
│   │   └── styles/
│   └── package.json
├── packages/
│   ├── api-types/
│   ├── config/
│   ├── core/
│   ├── shared-utils/
│   └── ui-kit/
├── docker/
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18.x o superior
- pnpm 10.17.0 o superior
- PostgreSQL 14+ (para entorno local de backend)

### Instalación

```bash
git clone <repository-url>
cd GS02-Tirzha_skincare_ecommerce
pnpm install
```

### Configuración de entorno

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Configura `DATABASE_URL` en `backend/.env` y `NEXT_PUBLIC_API_URL` en `frontend/.env.local`.

---

## Development

### Iniciar servidores

```bash
# Backend
cd backend
pnpm dev

# Frontend
cd frontend
pnpm dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

---

## Production Build

```bash
pnpm --filter @skincare/frontend build
pnpm --filter @skincare/backend build
```

---

## Deployment

- `docker/` contiene configuraciones de Docker Compose y contenedores.
- `vercel.json` y `railway.json` están listos para despliegue.

---

## Contributing

- Mantén la separación de capas y evita mezclar lógica de dominio con presentación.
- Usa `frontend/src/hooks/` para consumo de APIs y manipulación del carrito.
- Guarda constantes reutilizables en `frontend/src/data/`.
- Aprovecha la arquitectura limpia para futuras extensiones sin romper el flujo actual.
