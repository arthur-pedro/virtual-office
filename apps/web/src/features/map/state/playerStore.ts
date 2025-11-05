import { create } from "zustand";

import type {
  Direction,
  MoveMessage,
  PlayerState,
  Vector2,
} from "@virtual-office/shared-kernel";

interface PlayerStore {
  player: PlayerState;
  velocity: Vector2;
  sequence: number;
  updateDirection: (direction: Direction) => void;
  updatePosition: (position: Vector2) => void;
  updateVelocity: (velocity: Vector2) => void;
  commitMove: () => MoveMessage;
}

const DEFAULT_PLAYER: PlayerState = {
  id: "local-player",
  displayName: "You",
  position: { x: 128, y: 128 },
  direction: "down",
  role: "member",
  status: "online",
};

export const PLAYER_SPEED = 180; // pixels per second

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: DEFAULT_PLAYER,
  velocity: { x: 0, y: 0 },
  sequence: 0,
  updateDirection: (direction) =>
    set((state) => ({
      player: { ...state.player, direction },
    })),
  updatePosition: (position) =>
    set((state) => ({
      player: { ...state.player, position },
    })),
  updateVelocity: (velocity) => set({ velocity }),
  commitMove: () => {
    const state = get();
    const nextSequence = state.sequence + 1;

    set({ sequence: nextSequence });

    return {
      kind: "player/move" as const,
      playerId: state.player.id,
      position: state.player.position,
      direction: state.player.direction,
      velocity: state.velocity,
      sequence: nextSequence,
      timestamp: Date.now(),
    };
  },
}));
