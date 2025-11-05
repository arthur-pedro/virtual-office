import type { Direction, Vector2 } from "./vector2.js";

export type PlayerRole = "owner" | "admin" | "member" | "guest";

export type PresenceStatus = "offline" | "online" | "busy" | "away";

export interface PlayerState {
  readonly id: string;
  readonly displayName: string;
  readonly position: Vector2;
  readonly direction: Direction;
  readonly role: PlayerRole;
  readonly status: PresenceStatus;
}
