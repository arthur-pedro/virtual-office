import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

import { MapScene } from '../scenes/MapScene.ts';

export function MapViewport() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width: container.clientWidth || 1024,
      height: container.clientHeight || 768,
      backgroundColor: '#020617',
      scene: [MapScene],
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 0 },
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry || !game.scale) return;

      const { width, height } = entry.contentRect;
      game.scale.resize(width, height);
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      game.destroy(true);
    };
  }, []);

  return (
    <div className="relative flex flex-1">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
