import type { UseSonicBoomOptions } from "./types";
import { useChargeCommand } from "./useChargeCommand";

/**
 * A React hook that detects Sonic Boom charge command input (←charge→+P / [4]6P).
 *
 * This hook listens for keyboard inputs and triggers a callback when the classic
 * Street Fighter Sonic Boom command is successfully entered. The user must hold
 * the back direction for the charge time before pressing forward + punch.
 *
 * Supports both Arrow keys and WASD for directional input, and P key for punch.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "back" and "forward".
 *   - `"1P"` (default): Left is back, Right is forward. Command is ←charge→+P
 *   - `"2P"`: Right is back, Left is forward. Command is →charge←+P
 * @param options.onCommand - Callback function invoked when Sonic Boom command is detected.
 * @param options.chargeTime - Time in milliseconds to hold the charge direction.
 *   Defaults to 800ms.
 * @param options.inputWindow - Time window in milliseconds after charge to input release direction + button.
 *   Defaults to 500ms.
 *
 * @example
 * // Basic usage
 * useSonicBoom({
 *   onCommand: () => console.log("Sonic Boom!"),
 * });
 *
 * @example
 * // Shorter charge time for easier input
 * useSonicBoom({
 *   onCommand: handleSonicBoom,
 *   chargeTime: 500,
 * });
 */
export function useSonicBoom({
  side = "1P",
  onCommand,
  chargeTime,
  inputWindow,
}: UseSonicBoomOptions) {
  useChargeCommand({
    side,
    onCommand,
    chargeTime,
    inputWindow,
    config: {
      chargeDirection1P: "left",
      chargeDirection2P: "right",
      releaseDirection1P: "right",
      releaseDirection2P: "left",
      button: "punch",
    },
  });
}
