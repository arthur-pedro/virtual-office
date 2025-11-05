import { describe, expect, it } from "vitest";

import {
  MOVE_MESSAGE_KIND,
  type MoveMessage,
} from "../messages/move.js";

describe("MoveMessage contract", () => {
  it("locks the expected message kind", () => {
    const sample: MoveMessage = {
      kind: MOVE_MESSAGE_KIND,
      playerId: "player-123",
      position: { x: 10, y: 20 },
      direction: "down",
      velocity: { x: 1, y: 0 },
      sequence: 1,
      timestamp: Date.now(),
    };

    expect(sample.kind).toBe("player/move");
  });
});
