# Backend Overview

## Stack
- NestJS 10 (HTTP baseline; Colyseus/LiveKit adapters planned)
- Zod for runtime validation (to be wired into DTO pipelines)
- PostgreSQL, Redis, and LiveKit via Docker Compose

## Layered Structure
```
apps/server/src
├── application/     # Application services, orchestrating domain logic
│   └── presence/    # PresenceService (in-memory prototype)
├── domain/          # Domain aggregates and entities
│   └── player/
├── infra/           # Adapters for persistence, messaging, media (to be implemented)
└── interfaces/      # Delivery mechanisms (HTTP controllers, future WebSocket gateways)
```

## Current Endpoints
- `GET /health`: Basic heartbeat returning uptime and timestamp.

## Next Steps
1. Introduce persistence adapters (TypeORM/Prisma) under `infra/` and wire them into PresenceService.
2. Add WebSocket/Colyseus room handling for multi-player sessions.
3. Integrate LiveKit token issuing under `application/media`.
4. Replace in-memory presence store with Redis-backed repository.

## Testing
- Unit tests use Vitest; extend coverage by testing application services and adapters with focused specs.

## Environment
- Load secrets from `.env` or `.env.local`.
- Compose services provide `DATABASE_URL`, `REDIS_URL`, and LiveKit credentials automatically.
