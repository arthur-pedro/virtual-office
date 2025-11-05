# Virtual Office

Foundational monorepo for the Virtual Office platform. Phase 1 delivers offline 2D navigation on the web client and scaffolds for backend, shared kernel, and infrastructure.

## Structure
- `apps/web` — React + Phaser client with Tailwind and Zustand.
- `apps/server` — NestJS backend following domain/application/infra/interfaces layering.
- `packages/shared-kernel` — Shared contracts between client and server.
- `assets` — Maps, tilesets, characters, audio, and documentation for asset workflows.
- `docs` — Living documentation (frontend, backend, assets, docker, how-to guides).

## Quickstart
1. Install dependencies: `pnpm install` (Node 20+, pnpm 9+).
2. Copy `.env.example` to `.env` and adjust secrets.
3. Run web client: `pnpm --filter @virtual-office/web dev`.
4. Run server: `pnpm --filter @virtual-office/server dev`.
5. Or start everything with Docker: `docker compose up --build`.

## Verification
- `pnpm -r lint`
- `pnpm -r test`
- `pnpm -r typecheck`

## Documentation
Consult the `docs/` folder for detailed guides on extending each subsystem.
