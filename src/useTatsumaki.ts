import type { UseTatsumakiOptions } from "./types";
import { useCommand } from "./useCommand";

/**
 * A React hook that detects Tatsumaki Senpukyaku (Hurricane Kick) command input (↓↙←+K / 214K).
 *
 * This hook listens for keyboard inputs and triggers a callback when the classic
 * Street Fighter Tatsumaki command is successfully entered within the input window.
 *
 * Supports both Arrow keys and WASD for directional input, and K key for kick.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "forward".
 *   - `"1P"` (default): Right is forward. Command is ↓↙←+K (Down, Down-Left, Left, Kick)
 *   - `"2P"`: Left is forward. Command is ↓↘→+K (Down, Down-Right, Right, Kick)
 * @param options.onCommand - Callback function invoked when Tatsumaki command is detected.
 *   This function is called immediately after a successful command input.
 * @param options.inputWindow - Time window in milliseconds to complete the command.
 *   Defaults to 500ms. Inputs older than this are discarded.
 *
 * @example
 * // Basic usage with 1P side
 * function App() {
 *   useTatsumaki({
 *     onCommand: () => console.log("Tatsumaki Senpukyaku!"),
 *   });
 *   return <div>Press ↓↙←+K (Arrow keys or WASD)</div>;
 * }
 *
 * @example
 * // 2P side with custom callback
 * function Player2() {
 *   const [count, setCount] = useState(0);
 *
 *   useTatsumaki({
 *     side: "2P",
 *     onCommand: () => setCount((c) => c + 1),
 *   });
 *
 *   return <div>Tatsumaki count: {count}</div>;
 * }
 */
export function useTatsumaki({
  side = "1P",
  onCommand,
  inputWindow,
}: UseTatsumakiOptions) {
  useCommand({
    side,
    onCommand,
    inputWindow,
    config: {
      sequence1P: ["down", "down-left", "left"],
      sequence2P: ["down", "down-right", "right"],
      button: "kick",
    },
  });
}
