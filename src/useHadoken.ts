import { useCallback, useRef } from "react";
import type { Direction, UseHadokenOptions } from "./types";
import { useKeyboardInput } from "./useKeyboardInput";

type InputRecord = {
  direction: Direction;
  punch: boolean;
  timestamp: number;
};

const HADOUKEN_SEQUENCE_1P: Direction[] = ["down", "down-right", "right"];
const HADOUKEN_SEQUENCE_2P: Direction[] = ["down", "down-left", "left"];

const DEFAULT_INPUT_WINDOW = 500;

function matchesSequence(
  inputs: InputRecord[],
  sequence: Direction[],
  inputWindow: number,
): boolean {
  if (inputs.length === 0) return false;

  const now = inputs[inputs.length - 1].timestamp;
  const recentInputs = inputs.filter((i) => now - i.timestamp <= inputWindow);

  if (recentInputs.length < sequence.length + 1) return false;

  const lastInput = recentInputs[recentInputs.length - 1];
  if (!lastInput.punch) return false;

  const directionInputs = recentInputs.slice(0, -1);
  let seqIdx = 0;

  for (const input of directionInputs) {
    if (input.direction === sequence[seqIdx]) {
      seqIdx++;
      if (seqIdx === sequence.length) return true;
    }
  }

  return false;
}

/**
 * A React hook that detects Hadouken command input (↓↘→+P / 236P).
 *
 * This hook listens for keyboard inputs and triggers a callback when the classic
 * Street Fighter Hadouken command is successfully entered within the input window.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "forward".
 *   - `"1P"` (default): Right is forward. Command is ↓↘→+P (Down, Down-Right, Right, Punch)
 *   - `"2P"`: Left is forward. Command is ↓↙←+P (Down, Down-Left, Left, Punch)
 * @param options.onCommand - Callback function invoked when Hadouken command is detected.
 *   This function is called immediately after a successful command input.
 * @param options.inputWindow - Time window in milliseconds to complete the command.
 *   Defaults to 500ms. Inputs older than this are discarded.
 * @param options.keyMap - Custom key bindings. Defaults to arrow keys + P key.
 *   Override specific keys by providing a partial KeyMap object.
 *
 * @example
 * // Basic usage with 1P side
 * function App() {
 *   useHadoken({
 *     onCommand: () => console.log("Hadouken!"),
 *   });
 *   return <div>Press ↓↘→+P</div>;
 * }
 *
 * @example
 * // 2P side with custom callback
 * function Player2() {
 *   const [count, setCount] = useState(0);
 *
 *   useHadoken({
 *     side: "2P",
 *     onCommand: () => setCount((c) => c + 1),
 *   });
 *
 *   return <div>Hadouken count: {count}</div>;
 * }
 *
 * @example
 * // Custom input window (300ms) for stricter timing
 * useHadoken({
 *   onCommand: handleHadouken,
 *   inputWindow: 300,
 * });
 *
 * @example
 * // Custom key bindings (WASD + J for punch)
 * useHadoken({
 *   onCommand: handleHadouken,
 *   keyMap: {
 *     up: "KeyW",
 *     down: "KeyS",
 *     left: "KeyA",
 *     right: "KeyD",
 *     punch: "KeyJ",
 *   },
 * });
 */
export function useHadoken({
  side = "1P",
  onCommand,
  inputWindow = DEFAULT_INPUT_WINDOW,
  keyMap,
}: UseHadokenOptions) {
  const inputBuffer = useRef<InputRecord[]>([]);
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;

  const sequence = side === "1P" ? HADOUKEN_SEQUENCE_1P : HADOUKEN_SEQUENCE_2P;

  const handleInput = useCallback(
    (event: { direction: Direction; punch: boolean; timestamp: number }) => {
      const { direction, punch, timestamp } = event;

      inputBuffer.current.push({ direction, punch, timestamp });

      const cutoff = timestamp - inputWindow;
      inputBuffer.current = inputBuffer.current.filter(
        (i) => i.timestamp > cutoff,
      );

      if (matchesSequence(inputBuffer.current, sequence, inputWindow)) {
        inputBuffer.current = [];
        onCommandRef.current();
      }
    },
    [sequence, inputWindow],
  );

  useKeyboardInput({ keyMap, onInput: handleInput });
}
