FROM node:22-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY backend ./backend
COPY packages ./packages

RUN pnpm install --frozen-lockfile

FROM deps AS build

RUN pnpm --filter @skincare/backend build

FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=deps /app/backend ./backend
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/backend/dist ./backend/dist

COPY --from=deps /app/backend/prisma ./backend/prisma

WORKDIR /app/backend

EXPOSE 3001

CMD ["node", "dist/presentation/server.js"]