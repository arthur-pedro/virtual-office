import Phaser from "phaser";

import type { Direction } from "@virtual-office/shared-kernel";

import {
  PLAYER_SPEED,
  usePlayerStore,
} from "../state/playerStore.ts";

const WORLD_BOUNDS = new Phaser.Geom.Rectangle(0, 0, 1024, 768);

function deriveDirection(velocity: Phaser.Math.Vector2): Direction {
  if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
    return velocity.x >= 0 ? "right" : "left";
  }

  if (Math.abs(velocity.y) > 0) {
    return velocity.y >= 0 ? "down" : "up";
  }

  return usePlayerStore.getState().player.direction;
}

export class MapScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerSprite!: Phaser.GameObjects.Arc;

  constructor() {
    super("map");
  }

  create() {
    this.cameras.main.setBackgroundColor("#020617");
    this.add
      .grid(
        WORLD_BOUNDS.centerX,
        WORLD_BOUNDS.centerY,
        WORLD_BOUNDS.width,
        WORLD_BOUNDS.height,
        64,
        64,
        0x1e293b,
        0.2,
        0x0f172a,
        0.8
      )
      .setName("floor-grid");

    this.cursors = this.input.keyboard.createCursorKeys();

    const { player } = usePlayerStore.getState();

    this.playerSprite = this.add
      .circle(player.position.x, player.position.y, 16, 0x3b82f6, 1)
      .setStrokeStyle(2, 0xfbbf24)
      .setName("local-player");

    this.cameras.main
      .setBounds(WORLD_BOUNDS.x, WORLD_BOUNDS.y, WORLD_BOUNDS.width, WORLD_BOUNDS.height)
      .startFollow(this.playerSprite, true);
  }

  update(_time: number, delta: number) {
    const store = usePlayerStore.getState();
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.cursors.left?.isDown) {
      velocity.x -= PLAYER_SPEED;
    }
    if (this.cursors.right?.isDown) {
      velocity.x += PLAYER_SPEED;
    }
    if (this.cursors.up?.isDown) {
      velocity.y -= PLAYER_SPEED;
    }
    if (this.cursors.down?.isDown) {
      velocity.y += PLAYER_SPEED;
    }

    if (velocity.lengthSq() > 0) {
      velocity.normalize().scale(PLAYER_SPEED);
    }

    const deltaSeconds = delta / 1000;
    const nextPosition = {
      x: Phaser.Math.Clamp(
        store.player.position.x + velocity.x * deltaSeconds,
        WORLD_BOUNDS.left + 16,
        WORLD_BOUNDS.right - 16
      ),
      y: Phaser.Math.Clamp(
        store.player.position.y + velocity.y * deltaSeconds,
        WORLD_BOUNDS.top + 16,
        WORLD_BOUNDS.bottom - 16
      ),
    };

    const direction = deriveDirection(velocity);

    usePlayerStore.setState((state) => ({
      velocity: { x: velocity.x, y: velocity.y },
      player: {
        ...state.player,
        position: nextPosition,
        direction,
      },
    }));

    if (
      this.playerSprite.x !== nextPosition.x ||
      this.playerSprite.y !== nextPosition.y
    ) {
      this.playerSprite.setPosition(nextPosition.x, nextPosition.y);
    }
  }
}
