export interface Vector2 {
  readonly x: number;
  readonly y: number;
}

export type Direction = "up" | "down" | "left" | "right";

export const ZERO_VECTOR: Vector2 = { x: 0, y: 0 };
