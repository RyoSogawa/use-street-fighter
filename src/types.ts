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

export type ChargeCommandOptions = {
  side?: Side;
  onCommand: () => void;
  chargeTime?: number;
  inputWindow?: number;
};

export type UseSonicBoomOptions = ChargeCommandOptions;
export type UseSpinningBirdKickOptions = ChargeCommandOptions;

export type UseShunGokuSatsuOptions = CommandOptions;

export type UseStreetFighterOptions = {
  side?: Side;
  inputWindow?: number;
  chargeTime?: number;
  onHadouken?: () => void;
  onShoryuken?: () => void;
  onTatsumaki?: () => void;
  onSonicBoom?: () => void;
  onSpinningBirdKick?: () => void;
  onShunGokuSatsu?: () => void;
};
