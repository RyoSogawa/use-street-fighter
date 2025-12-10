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
