# GREEN AI Web Application

Production-grade web platform for GREEN AI, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and styled with modular CSS tokens.

---

## Table of Contents

1. [Prerequisites & System Requirements](#1-prerequisites--system-requirements)
2. [Package Installation](#2-package-installation)
3. [Environment Configuration](#3-environment-configuration)
4. [Local Development & Testing](#4-local-development--testing)
5. [Running on a Remote Host (PM2 Workflow)](#5-running-on-a-remote-host-pm2-workflow)
6. [Docker Image Creation](#6-docker-image-creation)
7. [Staging & Testing Server Deployment](#7-staging--testing-server-deployment)
8. [Final Production Server Deployment (Zero-Downtime)](#8-final-production-server-deployment-zero-downtime)
9. [Monitoring, Logs & Rollback Strategy](#9-monitoring-logs--rollback-strategy)

---

## 1. Prerequisites & System Requirements

Ensure the target host (local or remote server) meets the following requirements:

- **Node.js**: `v20.x` or `v22.x LTS` (v22+ recommended)
- **Package Manager**: `pnpm` (v10.28.1+)
- **Docker**: Engine `v24.0+` (for containerized deployments)
- **Host OS**: Linux (Ubuntu 22.04/24.04, Debian 12, Alpine 3.19+) or macOS
- **System Memory**: Minimum 2 GB RAM (4 GB recommended for production builds)

Enable `corepack` to ensure the exact `pnpm` version is active:

```bash
corepack enable
corepack prepare pnpm@10.28.1 --activate
```

---

## 2. Package Installation

Clone the repository and install dependencies using `pnpm`:

```bash
# Clone the repository
git clone https://github.com/Zainisrar/green-ai.git
cd green-ai

# Install dependencies (respecting lockfile)
pnpm install --frozen-lockfile
```

> **Note**: For development environments where dependency versions need resolution updates, use `pnpm install`.

---

## 3. Environment Configuration

Create the environment file for your target stage:

```bash
# For local development
cp .env.example .env.local

# Or configure environment variables directly
```

### Essential Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Application runtime mode | `production` or `development` |
| `PORT` | Application server port | `3001` (prod) / `5005` (dev) |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL | `https://greenai.percepco.co.uk` |
| `DEPLOY_HOST` | Remote target IP/domain | `2.25.110.97` |
| `DEPLOY_PORT` | Published production port | `3013` |
| `DEPLOY_USER` | Remote SSH user | `root` |

---

## 4. Local Development & Testing

### Development Mode

Run the Next.js development server with hot-reloading:

```bash
# Run standard development server (port 5005)
pnpm run dev

# Or with Turbopack acceleration
pnpm run dev:turbo
```

Access the app at: `http://localhost:5005`

### Type Checking & Linting

```bash
# Run TypeScript type validation across the entire project
./node_modules/.bin/tsc --noEmit

# Run code style & static analysis check
pnpm run lint
```

### Production Build & Local Preview

```bash
# Build production bundle using standalone tracing
pnpm run build

# Start the built production server locally (port 3001)
pnpm run start
```

Access the preview at: `http://localhost:3001`

---

## 5. Running on a Remote Host (PM2 Workflow)

If hosting directly on a Linux VPS/VM without Docker:

### 1. Build the application on the host

```bash
cd /var/www/green-ai
pnpm install --frozen-lockfile
pnpm run build
```

### 2. Manage process with PM2

The repository includes a tuned `ecosystem.config.js` for zero-crash production handling:

```bash
# Install PM2 globally if not present
npm install -g pm2

# Start the application in production mode
pm2 start ecosystem.config.js --env production

# View real-time status and logs
pm2 status
pm2 logs greenai

# Reload without downtime
pm2 reload greenai
```

### 3. Nginx Reverse Proxy Setup

Create `/etc/nginx/sites-available/greenai`:

```nginx
server {
    listen 80;
    server_name greenai.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/greenai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. Docker Image Creation

The project utilizes a multi-stage Docker build (`Dockerfile`) optimized for caching, minimal attack surface, and Alpine runtime security.

### Build the Docker Image

```bash
# Standard image build
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://greenai.percepco.co.uk \
  -t green-ai:latest .

# Build with a specific release tag
RELEASE_TAG=$(date -u +%Y%m%dT%H%M%SZ)
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://greenai.percepco.co.uk \
  -t green-ai:${RELEASE_TAG} .
```

### Multi-Stage Architecture Overview

- **Stage 1 (`base`)**: Node 22 Alpine, corepack, and pnpm installation.
- **Stage 2 (`deps`)**: Copies `package.json` & `pnpm-lock.yaml`, installs production dependencies with cached layer.
- **Stage 3 (`builder`)**: Compiles Webpack/Next.js standalone assets with traced SSR chunks.
- **Stage 4 (`runner`)**: Unprivileged `nextjs:nodejs` (UID 1001) runner container with healthcheck script on port 3001.

---

## 7. Staging & Testing Server Deployment

Before routing production traffic, spin up a testing container to perform automated smoke tests:

### 1. Launch Test Container

```bash
# Run test container on test port 3014
docker run -d \
  --name greenai-test-instance \
  --memory=1g \
  -p 127.0.0.1:3014:3001 \
  green-ai:latest
```

### 2. Verify Health & Smoke Test

```bash
# Run automated readiness poll (up to 90 seconds)
for i in $(seq 1 18); do
  if curl --fail --silent http://127.0.0.1:3014/ >/dev/null; then
    echo "Health check PASSED"
    break
  fi
  echo "Waiting for test container to be ready... (${i}/18)"
  sleep 5
done

# Check HTTP status code
curl -I http://127.0.0.1:3014/
```

### 3. Cleanup Test Instance

```bash
docker rm -f greenai-test-instance
```

---

## 8. Final Production Server Deployment (Zero-Downtime)

Use the automated zero-downtime blue-green release strategy.

### Automated Deployment Script

The included `scripts/deploy-production.sh` executes the entire pipeline over SSH:

```bash
# Set deployment credentials
export DEPLOY_PASSWORD="your-secure-ssh-password"
export DEPLOY_HOST="2.25.110.97"
export DEPLOY_PORT="3013"
export DEPLOY_USER="root"
export NEXT_PUBLIC_SITE_URL="https://greenai.percepco.co.uk"

# Execute zero-downtime deployment
bash scripts/deploy-production.sh
```

### Manual Step-by-Step Production Switch

If deploying manually on the server:

```bash
RELEASE_ID=$(date -u +%Y%m%dT%H%M%SZ)
NEW_CONTAINER="greenai-release-${RELEASE_ID}"
IMAGE_TAG="green-ai:release-${RELEASE_ID}"

# 1. Build release image
docker build -t ${IMAGE_TAG} .

# 2. Smoke check on staging port 3014
docker run -d --name smoke-test -p 127.0.0.1:3014:3001 ${IMAGE_TAG}
curl --fail --retry 10 --retry-delay 5 http://127.0.0.1:3014/

# 3. If smoke check succeeds, stop previous production container
PREV_CONTAINER=$(docker ps --filter publish=3001 -q | head -n1)
docker stop ${PREV_CONTAINER}

# 4. Launch new production container
docker run -d \
  --name ${NEW_CONTAINER} \
  --restart unless-stopped \
  --memory=1g \
  -p 127.0.0.1:3001:3001 \
  ${IMAGE_TAG}

# 5. Tag as latest and cleanup
docker tag ${IMAGE_TAG} green-ai:latest
docker rm -f smoke-test
docker rm ${PREV_CONTAINER} || true
```

---

## 9. Monitoring, Logs & Rollback Strategy

### Checking Container Health & Logs

```bash
# View active Docker containers
docker ps --filter "name=greenai"

# Follow real-time production logs
docker logs -f --tail 100 green-ai

# Check container resource usage
docker stats --no-stream
```

### Instant Rollback Procedure

If an issue occurs post-deployment, immediately switch back to the previous stable release tag:

```bash
# Stop malfunctioning container
docker stop greenai-release-${RELEASE_ID}

# Start previous release container
PREV_IMAGE=$(docker images green-ai --format "{{.Repository}}:{{.Tag}}" | sed -n '2p')
docker run -d \
  --name greenai-rollback \
  --restart unless-stopped \
  --memory=1g \
  -p 127.0.0.1:3001:3001 \
  ${PREV_IMAGE}
```

---

## 10. Security & Best Practices

- **Non-root container user**: The runner container executes under user `nextjs` (UID 1001).
- **Standalone bundle**: Container footprint is minimized using Next.js standalone file tracing.
- **Header security**: `next.config.ts` enforces `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and strict `Permissions-Policy`.
- **Cache headers**: Public assets are cached with `max-age=2592000` (30 days) and `stale-while-revalidate`.
