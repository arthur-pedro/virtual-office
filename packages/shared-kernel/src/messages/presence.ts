import type { PresenceStatus } from "../types/player.js";

export interface PresenceUpdateMessage {
  readonly kind: "presence/update";
  readonly playerId: string;
  readonly status: PresenceStatus;
  readonly timestamp: number;
}

export const PRESENCE_UPDATE_KIND: PresenceUpdateMessage["kind"] =
  "presence/update";
