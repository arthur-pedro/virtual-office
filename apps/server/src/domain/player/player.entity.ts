import type { PlayerState } from "@virtual-office/shared-kernel";

export class Player {
  constructor(private readonly state: PlayerState) {}

  get id() {
    return this.state.id;
  }

  get snapshot(): PlayerState {
    return { ...this.state };
  }
}
