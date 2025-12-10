import type { UseShoryukenOptions } from "./types";
import { useCommand } from "./useCommand";

/**
 * A React hook that detects Shoryuken (Dragon Punch) command input (→↓↘+P / 623P).
 *
 * This hook listens for keyboard inputs and triggers a callback when the classic
 * Street Fighter Shoryuken command is successfully entered within the input window.
 *
 * Supports both Arrow keys and WASD for directional input, and P key for punch.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "forward".
 *   - `"1P"` (default): Right is forward. Command is →↓↘+P (Right, Down, Down-Right, Punch)
 *   - `"2P"`: Left is forward. Command is ←↓↙+P (Left, Down, Down-Left, Punch)
 * @param options.onCommand - Callback function invoked when Shoryuken command is detected.
 *   This function is called immediately after a successful command input.
 * @param options.inputWindow - Time window in milliseconds to complete the command.
 *   Defaults to 500ms. Inputs older than this are discarded.
 *
 * @example
 * // Basic usage with 1P side
 * function App() {
 *   useShoryuken({
 *     onCommand: () => console.log("Shoryuken!"),
 *   });
 *   return <div>Press →↓↘+P (Arrow keys or WASD)</div>;
 * }
 *
 * @example
 * // 2P side with custom callback
 * function Player2() {
 *   const [count, setCount] = useState(0);
 *
 *   useShoryuken({
 *     side: "2P",
 *     onCommand: () => setCount((c) => c + 1),
 *   });
 *
 *   return <div>Shoryuken count: {count}</div>;
 * }
 */
export function useShoryuken({
  side = "1P",
  onCommand,
  inputWindow,
}: UseShoryukenOptions) {
  useCommand({
    side,
    onCommand,
    inputWindow,
    config: {
      sequence1P: ["right", "down", "down-right"],
      sequence2P: ["left", "down", "down-left"],
      button: "punch",
    },
  });
}
