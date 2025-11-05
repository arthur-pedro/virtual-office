# How to Create a New Character

1. **Design assets**
   - Use 64×64 px canvas per frame (adjust if needed and document the new size).
   - Export animations as horizontal spritesheets: `idle`, `walk`, and `emote`.
2. **Directory layout**
   - Place files under `assets/characters/<collection>/<variant>/`.
   - Include optional source files inside a `_src/` subfolder.
3. **Metadata file**
   - Create `meta.json` with:
     ```json
     {
       "frames": {
         "width": 64,
         "height": 64
       },
       "animations": {
         "idle": { "frames": 4, "frameRate": 6 },
         "walk": { "frames": 6, "frameRate": 10 },
         "emote": { "frames": 8, "frameRate": 12 }
       },
       "tint": "#FFFFFF"
     }
     ```
   - Add `pivot` or `offset` keys if the sprite needs alignment tweaks.
4. **Registration**
   - Update `docs/characters.md` with name, author, licensing, and notes.
   - Later, when the animation system is implemented, register the asset in `features/media` (client) and share availability via contracts in `shared-kernel`.
5. **Testing**
   - Run the web client locally, hotloading the new sprites by extending the loader (future step).
   - Ensure loops look smooth and emotes align with the avatar.
