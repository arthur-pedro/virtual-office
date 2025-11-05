import { Injectable } from "@nestjs/common";

import type { PlayerState } from "@virtual-office/shared-kernel";

@Injectable()
export class PresenceService {
  private readonly players = new Map<string, PlayerState>();

  upsert(state: PlayerState) {
    this.players.set(state.id, state);
  }

  list(): PlayerState[] {
    return [...this.players.values()];
  }
}
