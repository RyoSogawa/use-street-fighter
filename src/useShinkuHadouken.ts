import type { UseShinkuHadoukenOptions } from "./types";
import { useCommand } from "./useCommand";

/**
 * A React hook that detects Shinku Hadouken command input (↓↘→↓↘→+P / 236236P).
 *
 * This hook listens for keyboard inputs and triggers a callback when the
 * Street Fighter super move Shinku Hadouken command is successfully entered
 * within the input window. This is a double quarter-circle forward motion.
 *
 * Supports both Arrow keys and WASD for directional input, and P key for punch.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "forward".
 *   - `"1P"` (default): Right is forward. Command is ↓↘→↓↘→+P
 *   - `"2P"`: Left is forward. Command is ↓↙←↓↙←+P
 * @param options.onCommand - Callback function invoked when Shinku Hadouken command is detected.
 * @param options.inputWindow - Time window in milliseconds to complete the command.
 *   Defaults to 800ms (longer due to complexity).
 *
 * @example
 * // Basic usage
 * useShinkuHadouken({
 *   onCommand: () => console.log("Shinku Hadouken!"),
 * });
 *
 * @example
 * // 2P side
 * useShinkuHadouken({
 *   side: "2P",
 *   onCommand: handleShinkuHadouken,
 * });
 */
export function useShinkuHadouken({
  side = "1P",
  onCommand,
  inputWindow = 800,
}: UseShinkuHadoukenOptions) {
  useCommand({
    side,
    onCommand,
    inputWindow,
    config: {
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
    },
  });
}
