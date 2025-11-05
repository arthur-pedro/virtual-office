# Guia para Agentes — Projeto Escritório Virtual

## Contexto rápido
- Escopo desta fase: navegação 2D pelo mapa, conversas por áudio/vídeo/screen-share dentro das salas, bloqueio/desbloqueio com permissões e presença básica.
- A especificação detalhada está registrada no documento "Escritório Virtual — Documento de Arquitetura (Projeto Atual)" compartilhado com o time. Caso ainda não esteja versionado, priorize copiá-lo para o repositório e mantenha as implementações alinhadas às decisões ali descritas (React+Phaser no front, NestJS+Colyseus+LiveKit no back).
- Métricas de sucesso citadas na especificação: entrar em conversa em até 10 s, áudio com latência aceitável na mesma região e reconexão automática.

## Estrutura do workspace
- `virtual-office/` — monorepo PNPM (Node 20+) que concentra todo o código do produto.
  - `apps/server/` — backend NestJS organizado em `domain/`, `application/`, `infra/` e `interfaces/`. Colyseus será plugado aqui. Scripts úteis: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`.
  - `apps/web/` — cliente React+Vite com Phaser. Seguir arquitetura por features (ex.: `features/map`, `features/media`) e usar Tailwind e Zustand conforme o guia.
  - `packages/shared-kernel/` — contratos compartilhados (`MoveMsg`, `LockMsg`, roles, utilidades 2D). Sempre versionar tipos antes de integrá-los nos apps.
  - `assets/` — mapa Tiled, tilesets, atlases, personagens, UI e efeitos de áudio. Obedecer à organização descrita na especificação (camadas e propriedades obrigatórias).
  - `CHANGELOG.md` — histórico diário do que foi implementado e próximos passos sincronizados.
  - `pnpm-workspace.yaml`, `tsconfig.base.json`, `eslint.config.js` — configuração comum aos pacotes.

## Setup e comandos de verificação
- Pré-requisitos: Node 20+, pnpm 9+, Docker (para subir Postgres/Redis/LiveKit quando o compose estiver pronto).
- Na raiz `virtual-office/`: `pnpm install`.
- Verificações padrão: `pnpm -r build`, `pnpm -r lint`, `pnpm -r typecheck`, `pnpm -r test`. Os logs (`*.log`) na raiz ajudam a investigar falhas recentes.
- Docker local: `pnpm run up` sobe Postgres, Redis e LiveKit; `pnpm run down` encerra os serviços (remove órfãos).
- Desenvolvimento simultâneo web + server: `pnpm dev` (usa os scripts `dev` de `@virtual-office/web` e `@virtual-office/server` em paralelo).
- Banco local: `pnpm migrate` roda as migrações TypeORM; `pnpm seed` popula o espaço demo (idempotente).
- Variáveis sensíveis: definir `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES_IN` (ex.: `15m`) e `JWT_REFRESH_EXPIRES_IN` (ex.: `7d`) no `.env`; valores default existem apenas para dev. Configurar também `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL` (ex.: `ws://localhost:7880` em dev) e opcionalmente `LIVEKIT_TOKEN_TTL_SECONDS`. Para usar o compose local, alinhar `LIVEKIT_API_KEY=devkey` e `LIVEKIT_API_SECRET=devsecret`.
- Sempre atualizar o `CHANGELOG.md` e esse guia quando processos mudarem.

## Fluxo de trabalho recomendado
1. Ler `virtual-office/CHANGELOG.md` (seção “Próximos passos”) antes de iniciar qualquer implementação.
2. Validar o estado atual rodando build/lint/typecheck. Resolver pendências antes de empilhar novas tarefas.
3. Ao alterar contratos, atualizar primeiro `packages/shared-kernel`, depois propagar para `apps/server` e `apps/web`.
4. Executar `pnpm migrate` sempre que novas migrações forem introduzidas; usar `pnpm seed` para restaurar o estado demo durante QA manual (credenciais padrão: `owner@virtual-office.local` / `owner123!`).
5. Manter arquivos `.env` sincronizados com as variáveis obrigatórias de JWT e serviços externos.
6. Documentar decisões relevantes com comentários `@decision`, `@invariant`, `@tradeoff` ou `@risk` próximos ao código impactado.
7. Manter testes de unidade automatizados mínimos (shared-kernel + server). Expandir sempre que tocar regras críticas.
8. Começe pelo frontend de forma offline e depois vamos expandir para o back, integrando multiplos jogadores. Ao criar cada
  implementação, gere documentos. A principrio, não quero MVPs, quero que todo o código seja o entregavel final, bem feito e estruturado e componentizado. Sempre
  tires duvidas antes de iniciar e só comece a implementação quando tiver 100% de certeza do que precisa ser feito