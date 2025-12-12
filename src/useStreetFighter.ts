import type { Button, Direction, UseStreetFighterOptions } from "./types";
import { useChargeCommand } from "./useChargeCommand";
import { useCommand } from "./useCommand";
import { useShunGokuSatsu } from "./useShunGokuSatsu";

type CommandConfig = {
  sequence1P: Direction[];
  sequence2P: Direction[];
  button: Button;
};

const HADOUKEN_CONFIG: CommandConfig = {
  sequence1P: ["down", "down-right", "right"],
  sequence2P: ["down", "down-left", "left"],
  button: "punch",
};

const SHORYUKEN_CONFIG: CommandConfig = {
  sequence1P: ["right", "down", "down-right"],
  sequence2P: ["left", "down", "down-left"],
  button: "punch",
};

const TATSUMAKI_CONFIG: CommandConfig = {
  sequence1P: ["down", "down-left", "left"],
  sequence2P: ["down", "down-right", "right"],
  button: "kick",
};

type ChargeCommandConfig = {
  chargeDirections1P: Direction[];
  chargeDirections2P: Direction[];
  releaseDirection1P: Direction;
  releaseDirection2P: Direction;
  button: Button;
};

const SONIC_BOOM_CONFIG: ChargeCommandConfig = {
  chargeDirections1P: ["left", "down-left", "up-left"],
  chargeDirections2P: ["right", "down-right", "up-right"],
  releaseDirection1P: "right",
  releaseDirection2P: "left",
  button: "punch",
};

const SPINNING_BIRD_KICK_CONFIG: ChargeCommandConfig = {
  chargeDirections1P: ["down", "down-left", "down-right"],
  chargeDirections2P: ["down", "down-left", "down-right"],
  releaseDirection1P: "up",
  releaseDirection2P: "up",
  button: "kick",
};

/**
 * A unified React hook that detects multiple Street Fighter command inputs.
 *
 * This hook enables detection of motion commands (Hadouken, Shoryuken, Tatsumaki)
 * and charge commands (Sonic Boom, Spinning Bird Kick) through a single hook call.
 * Only commands with provided callbacks are activated, allowing selective command detection.
 *
 * Supports both Arrow keys and WASD for directional input, P key for punch, and K key for kick.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "forward".
 *   - `"1P"` (default): Right is forward
 *   - `"2P"`: Left is forward (commands are mirrored)
 * @param options.inputWindow - Time window in milliseconds to complete motion commands.
 *   Defaults to 500ms.
 * @param options.chargeTime - Time in milliseconds to hold charge direction for charge commands.
 *   Defaults to 800ms.
 * @param options.onHadouken - Callback for Hadouken command (↓↘→+P / 236P).
 * @param options.onShoryuken - Callback for Shoryuken command (→↓↘+P / 623P).
 * @param options.onTatsumaki - Callback for Tatsumaki command (↓↙←+K / 214K).
 * @param options.onSonicBoom - Callback for Sonic Boom charge command (←charge→+P / [4]6P).
 * @param options.onSpinningBirdKick - Callback for Spinning Bird Kick charge command (↓charge↑+K / [2]8K).
 * @param options.onShunGokuSatsu - Callback for Shun Goku Satsu button sequence (P P → K P).
 *
 * @example
 * // Enable all commands
 * useStreetFighter({
 *   onHadouken: () => console.log("Hadouken!"),
 *   onShoryuken: () => console.log("Shoryuken!"),
 *   onTatsumaki: () => console.log("Tatsumaki!"),
 *   onSonicBoom: () => console.log("Sonic Boom!"),
 *   onSpinningBirdKick: () => console.log("Spinning Bird Kick!"),
 *   onShunGokuSatsu: () => console.log("Shun Goku Satsu!"),
 * });
 *
 * @example
 * // Enable only charge commands with custom charge time
 * useStreetFighter({
 *   chargeTime: 500,
 *   onSonicBoom: handleSonicBoom,
 *   onSpinningBirdKick: handleSpinningBirdKick,
 * });
 */
const noop = () => {};

export function useStreetFighter({
  side = "1P",
  inputWindow,
  chargeTime,
  onHadouken,
  onShoryuken,
  onTatsumaki,
  onSonicBoom,
  onSpinningBirdKick,
  onShunGokuSatsu,
}: UseStreetFighterOptions) {
  // Motion commands
  useCommand({
    side,
    inputWindow,
    onCommand: onHadouken ?? noop,
    config: HADOUKEN_CONFIG,
    enabled: !!onHadouken,
  });

  useCommand({
    side,
    inputWindow,
    onCommand: onShoryuken ?? noop,
    config: SHORYUKEN_CONFIG,
    enabled: !!onShoryuken,
  });

  useCommand({
    side,
    inputWindow,
    onCommand: onTatsumaki ?? noop,
    config: TATSUMAKI_CONFIG,
    enabled: !!onTatsumaki,
  });

  // Charge commands
  useChargeCommand({
    side,
    inputWindow,
    chargeTime,
    onCommand: onSonicBoom ?? noop,
    config: SONIC_BOOM_CONFIG,
    enabled: !!onSonicBoom,
  });

  useChargeCommand({
    side,
    inputWindow,
    chargeTime,
    onCommand: onSpinningBirdKick ?? noop,
    config: SPINNING_BIRD_KICK_CONFIG,
    enabled: !!onSpinningBirdKick,
  });

  // Button sequence commands
  useShunGokuSatsu({
    side,
    inputWindow: inputWindow ?? 1000,
    onCommand: onShunGokuSatsu ?? noop,
    enabled: !!onShunGokuSatsu,
  });
}
