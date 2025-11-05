# Frontend Overview

## Tech Stack
- React 18 with Vite for bundling
- Phaser 3 for 2D map rendering
- Tailwind CSS for styling
- Zustand for local state management
- Vitest + Testing Library for unit tests

## Architecture
- `src/features/` groups code by domain; the `map` feature currently hosts Phaser integration.
- `src/features/map/components/` contains React-facing components (`MapViewport`, `PlayerHud`).
- `src/features/map/scenes/` encloses Phaser scenes (`MapScene`).
- `src/features/map/state/` exposes the Zustand store that mirrors the shared-kernel player contracts.
- `src/shared/` reserved for reusable primitives (empty for now).

## Map Flow
1. `MapViewport` mounts a Phaser `Game` instance that hosts `MapScene`.
2. `MapScene` renders a grid-based floor and the local player placeholder avatar.
3. Arrow keys (or WASD, via the browser default mapping) update the player vector and direction.
4. The map clamps movement to the pre-defined world bounds (1024×768).
5. The Zustand store tracks sequence numbers and produces move messages conforming to the shared kernel for future syncing.

## Extending the Map
- Add new Phaser scenes under `features/map/scenes` and register them in `MapViewport`.
- Use `usePlayerStore` for any component that needs player state; prefer selectors to avoid unnecessary re-renders.
- Integrate Colyseus/LiveKit networking by publishing `commitMove` outputs when you wire the backend, without changing scene logic.

## Styling Guidelines
- Tailwind classes keep layout consistent; define shared tokens in `tailwind.config.ts` under `theme.extend`.
- Use utility classes for layout; promote repeated patterns into components within `src/shared/components`.

## Testing Philosophy
- UI components: Testing Library snapshot/interaction tests.
- Stores and hooks: unit tests using Vitest with direct store imports.
- Phaser scenes: cover deterministic utilities (e.g., math) with unit tests; rely on integration/e2e stories once we add Playwright or Cypress.

