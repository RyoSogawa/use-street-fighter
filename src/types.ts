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

export type KeyMap = {
  up: string;
  down: string;
  left: string;
  right: string;
  punch: string;
  kick: string;
};

export const DEFAULT_KEY_MAP: KeyMap = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  punch: "KeyP",
  kick: "KeyK",
};

export type UseHadokenOptions = {
  side?: Side;
  onCommand: () => void;
  inputWindow?: number;
  keyMap?: Partial<KeyMap>;
};
