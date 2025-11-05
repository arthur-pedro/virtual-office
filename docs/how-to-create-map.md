# How to Create a New Map

1. **Plan the floorplan**
   - Define rooms, interaction zones, and camera bounds first.
   - Decide on tile size (default 32×32) and theme colors.
2. **Build in Tiled**
   - Create a new Orthogonal map; set tile size and map dimensions.
   - Add Required Layers:
     - `ground`: floor tiles.
     - `decoration`: non-collidable visuals.
     - `collision`: mark blocked tiles and set tile property `collidable=true`.
     - `interactions`: object layer. Each object needs:
       - `type`: `door`, `meeting`, `spawn`, etc.
       - `roomId`: slug for backend presence.
       - `permission`: `public | members | owners | custom`.
   - Configure map properties:
     - `spawn.x`, `spawn.y` (numbers).
     - `bounds.width`, `bounds.height` (numbers).
3. **Reference tilesets**
   - Use tilesets stored under `assets/tilesets`. Link by relative path to keep repository portability.
4. **Export runtime JSON**
   - `File → Export As…` and choose JSON. Save beside the `.tmx` using the same base name.
   - Running builds will load the JSON via Phaser's loader once networking is wired.
5. **Document**
   - Update `docs/maps.md` summarizing zones, spawn points, and special behaviours.
   - Add an entry in `CHANGELOG.md` referencing the new map.
6. **Hook up in the client**
   - Add loader code inside `features/map/scenes` (to be expanded when asset loading is implemented).
   - If collision boundaries change, update `WORLD_BOUNDS` or map-driven bounds.
