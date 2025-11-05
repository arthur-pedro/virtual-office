# Changelog — Virtual Office

## 2024-04-21

- Bootstraped PNPM monorepo (`apps/web`, `apps/server`, `packages/shared-kernel`, `assets`, `docs`).
- Implemented offline Phaser navigation in the web client with Zustand player store.
- Created shared-kernel contracts for movement and presence, with unit tests.
- Added NestJS scaffold with health endpoint and presence service prototype.
- Documented asset workflows, frontend/backend guides, and Docker usage.
- Provisioned Docker Compose stack (web, server, Postgres, Redis, LiveKit) with environment templates.

## Próximos passos
  - Preparar assets iniciais: defina um mapa em Tiled com camadas obrigatórias e exporte JSON para assets/
    maps, seguindo docs/how-to-create-map.md.
  - Enriquecer o cliente: carregar o mapa exportado no MapScene, adicionar tile collisions reais e esboçar
    HUD/contexto para múltiplos jogadores.
  - Evoluir o backend: planejar contrato de salas/presença persistente (Redis/Postgres), começando por
    endpoints ou websockets que publiquem MoveMessage.
  - Planejar integração de voz/vídeo: organizar emissão de tokens LiveKit no server e um shell de conexão no
    front (features/media).
  - Ampliar testes: cobrir usePlayerStore e presença in-memory, preparar base para testes de cena (mocks de
    Phaser).