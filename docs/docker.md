# Docker & Compose

## Requirements
- Docker Engine 24+
- Docker Compose plugin (v2)

## Services
- `web`: Vite dev server for the frontend (`5173`).
- `server`: NestJS backend (`3333`).
- `postgres`: Game state persistence and auth storage (`5432`).
- `redis`: Pub/sub and cache (`6379`).
- `livekit`: Media SFU (`7880` Signal, `7881` WebRTC).

## Usage
1. Copy `.env.example` to `.env` and adjust secrets.
2. Ensure dependencies are installed locally (run `pnpm install`).
3. `docker compose up --build` starts the stack. The `web` and `server` services run `pnpm install` on boot to keep modules in sync with the mounted source tree.
4. Access the web client at `http://localhost:5173` and the API at `http://localhost:3333/health`.

## Data Persistence
- Postgres data lives in the named volume `postgres_data`.
- Redis stores ephemeral data in `redis_data`.

## Troubleshooting
- If `pnpm install` runs in parallel and locks the store, restart one of the services after the other finishes.
- LiveKit dev mode uses the default `devkey/devsecret`. Replace with production credentials before deploying.
