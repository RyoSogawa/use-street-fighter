import { useCallback, useRef } from "react";
import type { Button, Direction, Side } from "./types";
import { useKeyboardInput } from "./useKeyboardInput";

type InputRecord = {
  direction: Direction;
  punch: boolean;
  kick: boolean;
  timestamp: number;
};

type CommandConfig = {
  sequence1P: Direction[];
  sequence2P: Direction[];
  button: Button;
};

const DEFAULT_INPUT_WINDOW = 500;

function matchesSequence(
  inputs: InputRecord[],
  sequence: Direction[],
  button: Button,
  inputWindow: number,
): boolean {
  if (inputs.length === 0) return false;

  const now = inputs[inputs.length - 1].timestamp;
  const recentInputs = inputs.filter((i) => now - i.timestamp <= inputWindow);

  if (recentInputs.length < sequence.length + 1) return false;

  const lastInput = recentInputs[recentInputs.length - 1];
  const buttonPressed = button === "punch" ? lastInput.punch : lastInput.kick;
  if (!buttonPressed) return false;

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

type UseCommandOptions = {
  side?: Side;
  onCommand: () => void;
  inputWindow?: number;
  config: CommandConfig;
  enabled?: boolean;
};

export function useCommand({
  side = "1P",
  onCommand,
  inputWindow = DEFAULT_INPUT_WINDOW,
  config,
  enabled = true,
}: UseCommandOptions) {
  const inputBuffer = useRef<InputRecord[]>([]);
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;

  const sequence = side === "1P" ? config.sequence1P : config.sequence2P;

  const handleInput = useCallback(
    (event: {
      direction: Direction;
      punch: boolean;
      kick: boolean;
      timestamp: number;
    }) => {
      if (!enabled) return;

      const { direction, punch, kick, timestamp } = event;

      inputBuffer.current.push({ direction, punch, kick, timestamp });

      const cutoff = timestamp - inputWindow;
      inputBuffer.current = inputBuffer.current.filter(
        (i) => i.timestamp > cutoff,
      );

      if (
        matchesSequence(
          inputBuffer.current,
          sequence,
          config.button,
          inputWindow,
        )
      ) {
        inputBuffer.current = [];
        onCommandRef.current();
      }
    },
    [enabled, sequence, inputWindow, config.button],
  );

  useKeyboardInput({ onInput: handleInput });
}
