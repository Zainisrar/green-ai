# Production image for the self-hosted GREEN website.
#
# The runtime user needs ownership of Next's image cache. Without it, each
# `next/image` request fails with EACCES and the browser receives broken or
# uncached images.
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
RUN apk add --no-cache libc6-compat curl

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://greenai.percepco.co.uk
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
# Turbopack is the Next 16 default, but this image is deployed through a
# production build where Webpack has been the stable compiler for this project.
RUN pnpm exec next build --webpack

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
RUN mkdir -p /app/.next/cache/images \
  && chown -R nextjs:nodejs /app/public /app/.next

USER nextjs
HEALTHCHECK --interval=15s --timeout=5s --retries=3 --start-period=30s \
  CMD wget -q --spider http://localhost:3001/ || exit 1
EXPOSE 3001
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3001"]
