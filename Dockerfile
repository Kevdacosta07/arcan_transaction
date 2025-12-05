FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Étape 1 : copier uniquement package.json pour maximiser le cache
COPY package.json package-lock.json* ./
RUN npm ci

# Étape 2 : copier tout le reste du code (incluant public/robots.txt)
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json


USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js", "--hostname", "0.0.0.0", "--port", "3000"]