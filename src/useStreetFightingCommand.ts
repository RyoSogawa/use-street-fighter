import type { Direction, UseStreetFightingCommandOptions } from "./types";
import {
  type CommandDefinition,
  useUnifiedCommandDetector,
} from "./useUnifiedCommandDetector";

const DEFAULT_INPUT_WINDOW = 500;
const DEFAULT_CHARGE_TIME = 800;
const DEFAULT_SUPER_INPUT_WINDOW = 800;
const DEFAULT_SEQUENCE_INPUT_WINDOW = 1000;

// Priority order (lower = higher priority):
// 1. Shun Goku Satsu (rarest, secret command)
// 2. Shinku Hadouken (super command)
// 3. Sonic Boom (charge command)
// 4. Spinning Bird Kick (charge command)
// 5. Shoryuken (motion command)
// 6. Tatsumaki (motion command)
// 7. Hadouken (most basic)

type SequenceStep =
  | { type: "punch" }
  | { type: "kick" }
  | { type: "direction"; direction: Direction };

/**
 * A unified React hook that detects multiple Street Fighter command inputs.
 *
 * This hook enables detection of motion commands (Hadouken, Shoryuken, Tatsumaki)
 * and charge commands (Sonic Boom, Spinning Bird Kick) through a single hook call.
 * Only commands with provided callbacks are activated, allowing selective command detection.
 *
 * When multiple commands match the same input, only the highest priority command fires.
 * Priority order (highest to lowest): Shun Goku Satsu > Shinku Hadouken > Sonic Boom >
 * Spinning Bird Kick > Shoryuken > Tatsumaki > Hadouken
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
 * @param options.onShinkuHadouken - Callback for Shinku Hadouken super command (↓↘→↓↘→+P / 236236P).
 *
 * @example
 * // Enable all commands
 * useStreetFightingCommand({
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
 * useStreetFightingCommand({
 *   chargeTime: 500,
 *   onSonicBoom: handleSonicBoom,
 *   onSpinningBirdKick: handleSpinningBirdKick,
 * });
 */
export function useStreetFightingCommand({
  side = "1P",
  inputWindow = DEFAULT_INPUT_WINDOW,
  chargeTime = DEFAULT_CHARGE_TIME,
  onHadouken,
  onShoryuken,
  onTatsumaki,
  onSonicBoom,
  onSpinningBirdKick,
  onShunGokuSatsu,
  onShinkuHadouken,
}: UseStreetFightingCommandOptions) {
  const forwardDirection: Direction = side === "1P" ? "right" : "left";
  const backDirection: Direction = side === "1P" ? "left" : "right";

  const shunGokuSatsuSequence: SequenceStep[] = [
    { type: "punch" },
    { type: "punch" },
    { type: "direction", direction: forwardDirection },
    { type: "kick" },
    { type: "punch" },
  ];

  const commands: CommandDefinition[] = [
    // Priority 1: Shun Goku Satsu (button sequence)
    {
      name: "shunGokuSatsu",
      priority: 1,
      callback: onShunGokuSatsu,
      config: {
        type: "buttonSequence",
        sequence1P: shunGokuSatsuSequence,
        sequence2P: shunGokuSatsuSequence,
        inputWindow: DEFAULT_SEQUENCE_INPUT_WINDOW,
      },
    },
    // Priority 2: Shinku Hadouken (super motion)
    {
      name: "shinkuHadouken",
      priority: 2,
      callback: onShinkuHadouken,
      config: {
        type: "motion",
        sequence1P: [
          "down",
          "down-right",
          "right",
          "down",
          "down-right",
          "right",
        ],
        sequence2P: ["down", "down-left", "left", "down", "down-left", "left"],
        button: "punch",
        inputWindow: DEFAULT_SUPER_INPUT_WINDOW,
      },
    },
    // Priority 3: Sonic Boom (charge)
    {
      name: "sonicBoom",
      priority: 3,
      callback: onSonicBoom,
      config: {
        type: "charge",
        chargeDirections1P: ["left", "down-left", "up-left"],
        chargeDirections2P: ["right", "down-right", "up-right"],
        releaseDirection1P: "right",
        releaseDirection2P: "left",
        button: "punch",
        chargeTime,
        inputWindow,
      },
    },
    // Priority 4: Spinning Bird Kick (charge)
    {
      name: "spinningBirdKick",
      priority: 4,
      callback: onSpinningBirdKick,
      config: {
        type: "charge",
        chargeDirections1P: ["down", "down-left", "down-right"],
        chargeDirections2P: ["down", "down-left", "down-right"],
        releaseDirection1P: "up",
        releaseDirection2P: "up",
        button: "kick",
        chargeTime,
        inputWindow,
      },
    },
    // Priority 5: Shoryuken (motion)
    {
      name: "shoryuken",
      priority: 5,
      callback: onShoryuken,
      config: {
        type: "motion",
        sequence1P: ["right", "down", "down-right"],
        sequence2P: ["left", "down", "down-left"],
        button: "punch",
        inputWindow,
      },
    },
    // Priority 6: Tatsumaki (motion)
    {
      name: "tatsumaki",
      priority: 6,
      callback: onTatsumaki,
      config: {
        type: "motion",
        sequence1P: ["down", "down-left", "left"],
        sequence2P: ["down", "down-right", "right"],
        button: "kick",
        inputWindow,
      },
    },
    // Priority 7: Hadouken (motion - lowest priority)
    {
      name: "hadouken",
      priority: 7,
      callback: onHadouken,
      config: {
        type: "motion",
        sequence1P: ["down", "down-right", "right"],
        sequence2P: ["down", "down-left", "left"],
        button: "punch",
        inputWindow,
      },
    },
  ];

  useUnifiedCommandDetector({
    side,
    commands,
  });
}
