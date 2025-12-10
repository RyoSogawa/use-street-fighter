export type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right"
  | "neutral";

export type Button = "punch" | "kick";

export type Side = "1P" | "2P";

export type Input = {
  direction: Direction;
  button: Button | null;
  timestamp: number;
};

export type UseHadokenOptions = {
  side?: Side;
  onCommand: () => void;
  inputWindow?: number;
};
