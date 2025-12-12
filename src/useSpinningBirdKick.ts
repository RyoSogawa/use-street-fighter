import type { UseSpinningBirdKickOptions } from "./types";
import { useChargeCommand } from "./useChargeCommand";

/**
 * A React hook that detects Spinning Bird Kick charge command input (↓charge↑+K / [2]8K).
 *
 * This hook listens for keyboard inputs and triggers a callback when the classic
 * Street Fighter Spinning Bird Kick command is successfully entered. The user must hold
 * the down direction for the charge time before pressing up + kick.
 *
 * Supports both Arrow keys and WASD for directional input, and K key for kick.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side. Note: Spinning Bird Kick uses the same directions
 *   regardless of side (↓charge↑+K).
 *   - `"1P"` (default)
 *   - `"2P"`
 * @param options.onCommand - Callback function invoked when Spinning Bird Kick command is detected.
 * @param options.chargeTime - Time in milliseconds to hold the charge direction.
 *   Defaults to 800ms.
 * @param options.inputWindow - Time window in milliseconds after charge to input release direction + button.
 *   Defaults to 500ms.
 *
 * @example
 * // Basic usage
 * useSpinningBirdKick({
 *   onCommand: () => console.log("Spinning Bird Kick!"),
 * });
 *
 * @example
 * // Shorter charge time for easier input
 * useSpinningBirdKick({
 *   onCommand: handleSpinningBirdKick,
 *   chargeTime: 500,
 * });
 */
export function useSpinningBirdKick({
  side = "1P",
  onCommand,
  chargeTime,
  inputWindow,
}: UseSpinningBirdKickOptions) {
  useChargeCommand({
    side,
    onCommand,
    chargeTime,
    inputWindow,
    config: {
      chargeDirections1P: ["down", "down-left", "down-right"],
      chargeDirections2P: ["down", "down-left", "down-right"],
      releaseDirection1P: "up",
      releaseDirection2P: "up",
      button: "kick",
    },
  });
}
