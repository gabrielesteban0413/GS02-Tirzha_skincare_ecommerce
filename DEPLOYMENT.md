# DEPLOYMENT GUIDE - Tirzha Skincare

## Problema con Netlify

El error 404 ocurre porque:
1. **Next.js requiere un servidor Node.js** para funcionar
2. **Netlify es hosting estático** - no puede ejecutar código Node.js
3. **Las rutas dinámicas** como `/productos/tipo/[type]` necesitan SSR
4. Netlify no puede renderizar estas páginas en tiempo de ejecución

---

## SOLUCIÓN 1: Vercel (RECOMENDADO - 5 minutos)

Vercel es creado por el equipo de Next.js. Es la forma más fácil.

### Paso 1: Preparar Repositorio

```bash
cd c:\Users\Sanch\Downloads\REPO\GS02-Tirzha_skincare_ecommerce

# Asegurar que el código está en GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Paso 2: Crear Cuenta en Vercel

1. Ir a https://vercel.com
2. Click en "Sign Up"
3. Seleccionar "GitHub" y autorizar
4. Crear equipo o usar personal

### Paso 3: Importar Proyecto

1. En Vercel dashboard, click en "Add New" → "Project"
2. Seleccionar tu repositorio de GitHub
3. Click en "Import"

### Paso 4: Configurar Proyecto

**Root Directory:**
- Select: `frontend`
- (Porque el frontend está en una subcarpeta)

**Build and Output Settings:**
- Build Command: `cd ../.. && pnpm install && pnpm build`
- Output Directory: `.next`
- Install Command: `pnpm install`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL = https://tu-backend-api.com
```

### Paso 5: Deploy

1. Click en "Deploy"
2. Vercel construye automáticamente
3. Tu sitio estará en `https://[project-name].vercel.app`

### Paso 6: Configurar Backend

El backend se necesita desplegar por separado.

**Opción A: Railway (Recomendado)**

```bash
# 1. Crear cuenta en https://railway.app

# 2. Conectar GitHub y autorizar

# 3. Crear nuevo proyecto
# 4. Seleccionar tu repositorio
# 5. Configurar:
#    - Root directory: backend/
#    - Build command: pnpm build
#    - Start command: pnpm start

# 6. Variables de entorno en Railway:
DATABASE_URL = postgresql://...
NODE_ENV = production
```
CORS_ORIGIN = https://tirzha-skincare.vercel.app

# 6. Comandos de despliegue:
# Build command: pnpm install && pnpm build
# Start command: pnpm start

# 7. Migrar la base de datos y cargar datos iniciales
# La primera vez que se despliegue la base de datos, ejecutar la seed manualmente:
# pnpm exec prisma db seed

**Opción B: Render (Alternativa)**

```
1. Ir a https://render.com
2. Click "New +" → "Web Service"
3. Conectar GitHub
4. Seleccionar tu repositorio
5. Configurar:
   - Name: tirzha-api
   - Environment: Node
   - Build command: cd backend && pnpm build
   - Start command: cd backend && pnpm start
```

### Paso 7: Conectar Backend y Frontend

Una vez tengas el backend deployado (ej: `https://api.railway.app`):

1. En Vercel dashboard, ir a "Settings"
2. "Environment Variables"
3. Actualizar:
   ```
   NEXT_PUBLIC_API_URL = https://api.railway.app
   ```
4. Redeploy (va a ocurrir automáticamente)

---

## SOLUCIÓN 2: Netlify + Backend Separado

Si insistes en usar Netlify, necesitas hacer esto:

### Paso 1: Crear `netlify.toml`

En la raíz del proyecto:

```toml
[build]
  base = "frontend"
  command = "pnpm build && pnpm export"
  publish = "out"

[dev]
  command = "pnpm dev"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
```

### Paso 2: Configurar Next.js para Export Estático

En `frontend/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Genera sitio estático
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
```

### Paso 3: Problema Principal

**PERO ESTO NO FUNCIONARÁ** porque:
- Pierdes toda capacidad de SSR
- Las rutas dinámicas no se pueden pre-renderizar
- Necesitarías `getStaticPaths` (muy limitado)

**MEJOR:** Usa Vercel o Docker

---

## SOLUCIÓN 3: Docker + Railway/Render

Para tener todo en un contenedor.

### Paso 1: Crear `docker-compose.yml` en raíz

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: tirzha
      POSTGRES_PASSWORD: password
      POSTGRES_DB: tirzha_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.api
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://tirzha:password@postgres:5432/tirzha_db
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
    command: pnpm start

  frontend:
    build:
      context: .
      dockerfile: docker/Dockerfile.web
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://backend:3001/api
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Paso 2: Backend Dockerfile

`docker/Dockerfile.api`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY backend ./backend
COPY packages ./packages

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Build
RUN cd backend && pnpm build

# Exponer puerto
EXPOSE 3001

# Ejecutar
CMD ["node", "backend/dist/presentation/server.js"]
```

### Paso 3: Frontend Dockerfile

`docker/Dockerfile.web`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY frontend ./frontend
COPY packages ./packages

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Build
RUN cd frontend && pnpm build

# Exponer puerto
EXPOSE 3000

# Ejecutar
CMD ["cd", "frontend", "&&", "pnpm", "start"]
```

### Paso 4: Deploy a Railway

```bash
# 1. Crear cuenta en https://railway.app

# 2. Instalar CLI
npm i -g @railway/cli

# 3. Login
railway login

# 4. Crear proyecto
railway init

# 5. Deploy
railway up
```

---

## SOLUCIÓN RECOMENDADA: Vercel + Railway

### Ventajas:
- ✅ Vercel: Optimizado para Next.js
- ✅ Railway: Fácil para Node.js + PostgreSQL
- ✅ Escalable y barato
- ✅ Deploys automáticos desde Git

### Tiempo: 15 minutos

### Costo:
- **Vercel:** Gratis para proyectos pequeños
- **Railway:** $5/mes base (muy asequible)
- **Total:** ~$5/mes

### Paso a Paso:

#### 1. Vercel (Frontend - 3 minutos)

```bash
# En GitHub, ir a tu repositorio
# Ir a https://vercel.com/new
# Conectar GitHub
# Seleccionar tu repo
# Configurar:
#   - Root: frontend
#   - Build: pnpm build
#   - Output: .next
```

#### 2. Railway (Backend + DB - 5 minutos)

```bash
# Ir a https://railway.app
# Crear nuevo proyecto
# Seleccionar GitHub
# Conectar repo
# Agregar servicio PostgreSQL
# Configurar backend:
#   - Root: backend/
#   - Build: pnpm build
#   - Start: pnpm start
```

#### 3. Conectar (2 minutos)

```bash
# En Vercel, agregar variable de entorno:
NEXT_PUBLIC_API_URL = https://backend-xxx.railway.app

# Redeploy automático
```

---

## PASOS DETALLADOS PARA VERCEL

### 1. Preparar GitHub

```bash
cd c:\Users\Sanch\Downloads\REPO\GS02-Tirzha_skincare_ecommerce

# Asegurar que todo está commiteado
git status

# Si hay cambios:
git add .
git commit -m "Deploy ready"
git push origin main
```

### 2. Ir a Vercel

- https://vercel.com
- Click "Sign Up"
- Autorizar con GitHub

### 3. Importar Proyecto

- Dashboard → "Add New" → "Project"
- Buscar tu repositorio
- Click "Import"

### 4. Configurar Build

En la pantalla de configuración:

**Project Settings:**
```
Project Name: tirzha-skincare
```

**Root Directory:**
```
Select: frontend
(Es importante porque está en subcarpeta)
```

**Build & Development Settings:**
```
Framework: Next.js
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
Development Command: pnpm dev
```

**Environment Variables:**

```
NEXT_PUBLIC_API_URL = http://localhost:3001/api (development)
NEXT_PUBLIC_API_URL = https://api.railway.app (production)
```

### 5. Deploy

Click "Deploy"

Vercel construye automáticamente. En 2-3 minutos tu sitio estará live.

**Tu URL será:**
```
https://tirzha-skincare.vercel.app
```

---

## PASOS DETALLADOS PARA RAILWAY (Backend)

### 1. Crear Cuenta

- https://railway.app
- Sign up con GitHub

### 2. Crear Proyecto

- Dashboard → "New Project"
- Seleccionar "Deploy from GitHub repo"
- Seleccionar tu repositorio

### 3. Agregar PostgreSQL

- Click "Add Service"
- Seleccionar "PostgreSQL"

### 4. Configurar Backend

- Click "Add Service"
- Seleccionar "GitHub repo"
- Seleccionar tu repo
- Configurar:

**Build:**
```
Root Directory: backend
Build Command: pnpm install && pnpm build
Start Command: node dist/presentation/server.js
```

### 5. Variables de Entorno

En Railway dashboard, ir a backend service:

```
DATABASE_URL = (auto-generada por PostgreSQL)
NODE_ENV = production
JWT_SECRET = (generar clave segura: openssl rand -hex 32)
PORT = 3001
```

### 6. Deploy

Railway deploy automáticamente desde Git.

Tu backend estará en:
```
https://backend-xxx.railway.app
```

---

## VERIFICAR QUE FUNCIONA

### 1. Test Backend

```bash
curl https://tu-backend-railway.app/api/products
```

Debe retornar JSON (no 404)

### 2. Test Frontend

```bash
https://tu-frontend-vercel.app/
```

Debe cargar la página (no 404)

### 3. Test Rutas Dinámicas

```bash
https://tu-frontend-vercel.app/productos/tipo/hidratantes
```

Debe funcionar (es la prueba de que SSR funciona)

---

## TROUBLESHOOTING

### Error: "Cannot find module 'tsyringe'"

**Solución:**
```bash
cd backend
pnpm install
```

### Error: "DATABASE_URL is not defined"

**Solución:**
En Railway, agregar variable:
```
DATABASE_URL=postgresql://...
```

### Error: La API responde pero no hay productos

**Solución:**
La base ya existe, pero falta cargar datos iniciales. Ejecuta una sola vez:
```bash
pnpm exec prisma db seed
```
Esto usa el archivo `backend/prisma/seed.ts` y crea los productos iniciales.

### Error: "NEXT_PUBLIC_API_URL is not defined"

**Solución:**
En Vercel, agregar variable:
```
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
```

### Error: "Build takes too long"

**Solución:**
Railway y Vercel tiene límites de tiempo. Si pasa:
1. Optimizar `pnpm-lock.yaml`
2. Reducir número de dependencias
3. Usar monorepo cache en Vercel

---

## RESUMEN RÁPIDO

| Aspecto | Solución |
|--------|----------|
| Frontend | Vercel |
| Backend | Railway |
| Database | Railway PostgreSQL |
| Costo | Gratis + $5/mes |
| Tiempo Setup | 15 minutos |
| SSR Dynamic Routes | ✅ Funciona |
| Deploy Automático | ✅ Desde Git |

---

## NO USAR NETLIFY PARA ESTO

Razones:
- ❌ Netlify no es para Next.js full-stack
- ❌ No soporta SSR adecuadamente
- ❌ Las rutas dinámicas no funcionan
- ❌ Tendrías que usar export estático (pierde funcionalidad)

**Usa Vercel.** Es más fácil, más barato y está diseñado para esto.

