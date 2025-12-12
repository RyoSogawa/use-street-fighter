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

export type CommandOptions = {
  side?: Side;
  onCommand: () => void;
  inputWindow?: number;
};

export type UseHadokenOptions = CommandOptions;
export type UseShoryukenOptions = CommandOptions;
export type UseTatsumakiOptions = CommandOptions;

export type UseStreetFighterOptions = {
  side?: Side;
  inputWindow?: number;
  onHadouken?: () => void;
  onShoryuken?: () => void;
  onTatsumaki?: () => void;
};
