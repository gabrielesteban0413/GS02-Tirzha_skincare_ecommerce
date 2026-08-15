Tirzha — Plataforma Ecommerce de Skincare
=========================================


<p align="center">
  <img src="frontend/public/images/recording/home.gif" width="280" style="max-width:100%">
  <img src="frontend/public/images/recording/home.gif" width="280" style="max-width:100%">
  <img src="frontend/public/images/recording/home.gif" width="280" style="max-width:100%">
</p>

Resumen ejecutivo
------------------
Tirzha es una plataforma de comercio electrónico especializada en productos de cuidado de la piel. Diseñada y desarrollada con principios de arquitectura limpia y prácticas de ingeniería de software de nivel empresarial, Tirzha ofrece un catálogo avanzado de productos, gestión de pedidos y una experiencia de usuario optimizada para dispositivos móviles y escritorio.

Propósito del repositorio
-------------------------

Este repositorio contiene la implementación completa del proyecto en formato monorepo: backend (API), frontend (Next.js) y paquetes compartidos. Está pensado para despliegues empresariales, integración CI/CD y escalado según demanda.

Índice
------

- Resumen ejecutivo
- Estado del proyecto
- Características clave
- Arquitectura y organización del código
- Tecnologías principales
- Requisitos e instalación rápida
- Desarrollo y pruebas
- Despliegue y producción
- Contribución y buenas prácticas
- Soporte y contacto

Estado del proyecto
-------------------
- Estado: Producción / Preparado para despliegue (configurable)
- Última actualización: Junio 2026
- Versión: 1.0.0

Características clave
--------------------
- Catálogo de productos con filtros avanzados (por tipo, categoría y solución)
- Carrito de compra con actualizaciones en tiempo real
- Autenticación y gestión de perfiles de usuario
- Flujo de pedidos y administración de órdenes
- Plantillas de rutinas de cuidado de la piel
- Arquitectura modular y testable (Clean Architecture)

Arquitectura y estructura del repositorio
---------------------------------------
El proyecto sigue los principios de Clean Architecture con capas bien definidas:

- Domain: Entidades, objetos de valor y reglas de negocio.
- Application: Casos de uso, DTOs y orquestación de lógica.
- Infrastructure: Persistencia (Prisma), clientes externos (pagos, email), DI y cache.
- Presentation: API REST (Express) y controladores; Frontend (Next.js App Router).

Estructura principal (resumen)

```
.
├── backend/        # API, Prisma, migraciones y servicios
├── frontend/       # Next.js (App Router), componentes y assets
├── packages/       # Paquetes compartidos (types, config, core, ui-kit)
└── docker/         # Contenedores y compose para despliegue local
```

Tecnologías principales
-----------------------

- Backend: Node.js, TypeScript, Express, Prisma, PostgreSQL
- Frontend: Next.js 14 (App Router), React 18, Tailwind CSS
- Estado: React Query (server), Zustand (cliente)
- Monorepo: pnpm workspaces, Turbo

Requisitos previos
------------------

- Node.js 18+ (recomendado)
- pnpm 7+ (o la versión especificada por el equipo)
- PostgreSQL 14+
- Docker (opcional para despliegue local)

Instalación rápida (desarrollo)
-------------------------------

1. Clonar el repositorio

```bash
git clone <repositorio>
cd GS02-Tirzha_skincare_ecommerce
```

2. Instalar dependencias (monorepo)

```bash
pnpm install
```

3. Configurar variables de entorno

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Ajustar DATABASE_URL en backend/.env
```

4. Ejecutar en desarrollo (terminales separadas)

```bash
# Backend
cd backend
pnpm dev

# Frontend
cd frontend
pnpm dev
```

Comandos útiles
---------------

- `pnpm dev` — iniciar servidor de desarrollo (por paquete)
- `pnpm build` — compilar los paquetes
- `pnpm lint` — ejecutar linters
- `pnpm test` — ejecutar pruebas

Base de datos
-------------

Aplicar migraciones y seed:

```bash
cd backend
pnpm exec prisma migrate dev
pnpm exec prisma db seed
```

Despliegue y recomendaciones
----------------------------

Recomendado: desplegar frontend en Vercel (optimizado para Next.js) y backend en una plataforma de Node.js gestionada (Railway, Render, AWS ECS, etc.).

Opciones comunes:

- Vercel (frontend): configurar `frontend` como directorio raíz y variables de entorno.
- Railway / Render (backend): exponer `DATABASE_URL`, `NODE_ENV=production`, `PORT` y `JWT_SECRET`.
- Docker: `docker-compose` incluido para entornos replicables.

Buenas prácticas para producción
--------------------------------
- Gestionar secretos mediante un vault o variables de entorno en la plataforma de despliegue.
- Ejecutar migraciones como paso de despliegue controlado.
- Monitorización y alertas (logs, Sentry, métricas).
- Políticas de backup para la base de datos.

Contribución
------------

Se agradecen contribuciones siguiendo el flujo estándar:

1. Abrir un issue describiendo el cambio o la mejora.
2. Crear una rama basada en `main`: `feature/<nombre>`.
3. Añadir tests y documentación cuando aplique.
4. Crear un Pull Request con descripción clara y pasos para reproducir.

Guías de estilo
--------------

- TypeScript: reglas del `eslint-config` compartido en `packages/config`.
- Commits: mensajes claros y atómicos. Prefijo sugerido: `feat:`, `fix:`, `chore:`.

Soporte y contacto
-------------------

Para soporte interno o preguntas relacionadas con despliegue y arquitectura, contactar al equipo de desarrollo responsable o abrir un issue en este repositorio.

Licencia
--------

Propietario: Tirzha — Todos los derechos reservados.

Registro de cambios (changelog)
-------------------------------

Version 1.0.0 — Junio 2026
- Versión inicial pública del proyecto.

—

Si quieres, puedo: 1) añadir una versión en inglés, 2) generar una sección de arquitectura visual (diagramas), o 3) adaptar el README para un `CONTRIBUTING.md` separado. ¿Cuál prefieres?
