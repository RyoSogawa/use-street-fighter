import type { Button, Direction, UseStreetFighterOptions } from "./types";
import { useCommand } from "./useCommand";

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

/**
 * A unified React hook that detects multiple Street Fighter command inputs.
 *
 * This hook enables detection of Hadouken, Shoryuken, and Tatsumaki commands
 * through a single hook call. Only commands with provided callbacks are activated,
 * allowing selective command detection.
 *
 * Supports both Arrow keys and WASD for directional input, P key for punch, and K key for kick.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "forward".
 *   - `"1P"` (default): Right is forward
 *   - `"2P"`: Left is forward (commands are mirrored)
 * @param options.inputWindow - Time window in milliseconds to complete commands.
 *   Defaults to 500ms. Applies to all active commands.
 * @param options.onHadouken - Callback for Hadouken command (↓↘→+P / 236P).
 *   If not provided, Hadouken detection is disabled.
 * @param options.onShoryuken - Callback for Shoryuken command (→↓↘+P / 623P).
 *   If not provided, Shoryuken detection is disabled.
 * @param options.onTatsumaki - Callback for Tatsumaki command (↓↙←+K / 214K).
 *   If not provided, Tatsumaki detection is disabled.
 *
 * @example
 * // Enable all commands
 * useStreetFighter({
 *   onHadouken: () => console.log("Hadouken!"),
 *   onShoryuken: () => console.log("Shoryuken!"),
 *   onTatsumaki: () => console.log("Tatsumaki!"),
 * });
 *
 * @example
 * // Enable only Hadouken
 * useStreetFighter({
 *   onHadouken: () => setCount(c => c + 1),
 * });
 *
 * @example
 * // 2P side with custom input window
 * useStreetFighter({
 *   side: "2P",
 *   inputWindow: 300,
 *   onHadouken: handleHadouken,
 *   onShoryuken: handleShoryuken,
 * });
 */
const noop = () => {};

export function useStreetFighter({
  side = "1P",
  inputWindow,
  onHadouken,
  onShoryuken,
  onTatsumaki,
}: UseStreetFighterOptions) {
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
}
