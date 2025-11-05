import type { Direction, Vector2 } from "../types/vector2.js";
/**
 * Message published when a player changes its position locally.
 */
export interface MoveMessage {
    readonly kind: "player/move";
    readonly playerId: string;
    readonly position: Vector2;
    readonly direction: Direction;
    readonly velocity: Vector2;
    readonly sequence: number;
    readonly timestamp: number;
}
export declare const MOVE_MESSAGE_KIND: MoveMessage["kind"];
