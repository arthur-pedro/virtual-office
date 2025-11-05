# Assets Playbook

## Tilesets
- Place `.png` tilesheets under `assets/tilesets`. Each tileset must include a sibling `.tsx` from Tiled with collision/object layer metadata.
- Tile size defaults to **32×32 px**; if you introduce a different size, document it inside the map JSON under `meta.tileSize`.
- Collision layers should set a boolean `collidable=true` property per tile. Additional properties:
  - `roomId`: string indicating the virtual room.
  - `permission`: optional (`public`, `members`, `owners`) used by locking logic.
- Use palette-friendly colors and avoid embedded text; UI overlays handle labels.

## Maps
- Store Tiled `.tmx` files in `assets/maps` and export JSON (same base name with `.json`) for runtime loading.
- Mandatory layers:
  1. `ground` (tile layer) — walkable floor.
  2. `decoration` (tile/object) — non-collidable visuals.
  3. `collision` (tile layer) — mark blocked tiles via `collidable` property.
  4. `interactions` (object layer) — define rectangles with properties `{ type, roomId, permission }` for doors or meeting areas.
- Include a `properties` section on the map root with:
  - `spawn.x`, `spawn.y`: default spawn coordinates.
  - `bounds.width`, `bounds.height`: world dimensions.

## Characters
- Group by collection: `assets/characters/<collection>/<variant>/`.
- Provide the following per variant:
  - `idle.png`, `walk.png`, `emote.png` spritesheets.
  - `meta.json` specifying frame dimensions, animation frame rate, and default tint.
- Keep animation frames arranged horizontally; frame height is `64px` by default.
- When adding a new character:
  1. Drop the assets in the correct directory.
  2. Update `docs/characters.md` with description and licensing.
  3. Register metadata in the web app (see `features/media` once implemented).

## Audio
- Store `.ogg` (primary) and `.mp3` (fallback) files. Provide loop-safe variants when applicable.
- Name scheme: `context-purpose_version.ogg` (e.g., `lobby-ambience_v1.ogg`).
- Provide `meta.json` with gain recommendations.

## Effects & UI
- Particles: keep small `.png` textures and, if shaders are needed, store GLSL under `assets/effects/shaders`.
- UI: Keep raw SVGs and export optimized versions for runtime. Document required fonts in `docs/fonts.md` (to be created when first font is imported).

## Workflow Tips
- Use Git LFS for binary files above 1 MB (configure before committing large assets).
- When iterating on maps, keep changelog entries referencing both `.tmx` and exported `.json` updates.
- Update `docs/assets-changelog.md` if asset changes include licensing or third-party sources.
