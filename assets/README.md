# Assets Directory

```
assets/
├── maps/         # Tiled (`.tmx`) files and exported JSON maps
├── tilesets/     # Individual tileset images (`.png`) and definitions (`.tsx`)
├── atlases/      # Spritesheet atlases (TexturePacker JSON or Phaser atlas)
├── characters/   # Character animations separated by collection
├── ui/           # UI icons, panels, fonts, cursors
├── audio/        # Sound effects and background loops
├── effects/      # Particle textures, shader assets
└── docs/         # Complementary documents (e.g., level specs)
```

- Keep filenames lowercase and dash-separated (e.g., `office-lobby.tmx`).
- Provide a matching JSON metadata file beside each map describing zones, collision layers, and room identifiers.
- Store source design files (e.g., `.aseprite`) under the same folder with `_src` suffix if versioning is needed.
