import { useCallback, useMemo, useRef } from "react";
import type { Direction, UseShunGokuSatsuOptions } from "./types";
import { useKeyboardInput } from "./useKeyboardInput";

const DEFAULT_INPUT_WINDOW = 1000;

type SequenceStep =
  | { type: "punch" }
  | { type: "kick" }
  | { type: "direction"; direction: Direction };

/**
 * A React hook that detects Shun Goku Satsu (Raging Demon) command input (P P → K P).
 *
 * This hook listens for keyboard inputs and triggers a callback when the classic
 * Street Fighter Shun Goku Satsu command is successfully entered within the input window.
 * This is a button sequence command requiring precise timing.
 *
 * Supports both Arrow keys and WASD for directional input, P key for punch, and K key for kick.
 *
 * @param options - Configuration options for the hook
 * @param options.side - Player side, affects which direction is "forward".
 *   - `"1P"` (default): Right is forward. Command is P P → K P
 *   - `"2P"`: Left is forward. Command is P P ← K P
 * @param options.onCommand - Callback function invoked when Shun Goku Satsu command is detected.
 * @param options.inputWindow - Time window in milliseconds to complete the command.
 *   Defaults to 1000ms (longer due to complexity).
 *
 * @example
 * // Basic usage
 * useShunGokuSatsu({
 *   onCommand: () => console.log("Shun Goku Satsu!"),
 * });
 *
 * @example
 * // 2P side
 * useShunGokuSatsu({
 *   side: "2P",
 *   onCommand: handleShunGokuSatsu,
 * });
 */
type UseShunGokuSatsuInternalOptions = UseShunGokuSatsuOptions & {
  enabled?: boolean;
};

export function useShunGokuSatsu({
  side = "1P",
  onCommand,
  inputWindow = DEFAULT_INPUT_WINDOW,
  enabled = true,
}: UseShunGokuSatsuInternalOptions) {
  const sequenceIndex = useRef(0);
  const lastInputTime = useRef<number>(0);
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;

  const forwardDirection: Direction = side === "1P" ? "right" : "left";

  // Sequence: P, P, →, K, P
  const sequence = useMemo<SequenceStep[]>(
    () => [
      { type: "punch" },
      { type: "punch" },
      { type: "direction", direction: forwardDirection },
      { type: "kick" },
      { type: "punch" },
    ],
    [forwardDirection],
  );

  const handleInput = useCallback(
    (event: {
      direction: Direction;
      punch: boolean;
      kick: boolean;
      timestamp: number;
    }) => {
      if (!enabled) return;

      const { direction, punch, kick, timestamp } = event;

      // Reset if too much time has passed
      if (
        lastInputTime.current > 0 &&
        timestamp - lastInputTime.current > inputWindow
      ) {
        sequenceIndex.current = 0;
      }

      const currentStep = sequence[sequenceIndex.current];
      let matched = false;

      if (currentStep.type === "punch" && punch) {
        matched = true;
      } else if (currentStep.type === "kick" && kick) {
        matched = true;
      } else if (
        currentStep.type === "direction" &&
        direction === currentStep.direction &&
        !punch &&
        !kick
      ) {
        matched = true;
      }

      if (matched) {
        lastInputTime.current = timestamp;
        sequenceIndex.current++;

        if (sequenceIndex.current >= sequence.length) {
          sequenceIndex.current = 0;
          lastInputTime.current = 0;
          onCommandRef.current();
        }
      } else if (punch || kick || direction !== "neutral") {
        // Wrong input - check if it matches the start of the sequence
        if (currentStep.type === "punch" && punch) {
          // Already handled above
        } else if (sequence[0].type === "punch" && punch) {
          // Restart sequence
          sequenceIndex.current = 1;
          lastInputTime.current = timestamp;
        } else {
          // Reset completely
          sequenceIndex.current = 0;
          lastInputTime.current = 0;
        }
      }
    },
    [enabled, inputWindow, sequence],
  );

  useKeyboardInput({ onInput: handleInput });
}
