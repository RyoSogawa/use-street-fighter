import { useCallback, useRef } from "react";
import type { Button, Direction, Side } from "./types";
import { useKeyboardInput } from "./useKeyboardInput";

type InputRecord = {
  direction: Direction;
  punch: boolean;
  kick: boolean;
  timestamp: number;
};

// Motion command config
type MotionCommandConfig = {
  type: "motion";
  sequence1P: Direction[];
  sequence2P: Direction[];
  button: Button;
  inputWindow: number;
};

// Charge command config
type ChargeCommandConfig = {
  type: "charge";
  chargeDirections1P: Direction[];
  chargeDirections2P: Direction[];
  releaseDirection1P: Direction;
  releaseDirection2P: Direction;
  button: Button;
  chargeTime: number;
  inputWindow: number;
};

// Button sequence config
type SequenceStep =
  | { type: "punch" }
  | { type: "kick" }
  | { type: "direction"; direction: Direction };

type ButtonSequenceConfig = {
  type: "buttonSequence";
  sequence1P: SequenceStep[];
  sequence2P: SequenceStep[];
  inputWindow: number;
};

export type CommandConfig =
  | MotionCommandConfig
  | ChargeCommandConfig
  | ButtonSequenceConfig;

export type CommandDefinition = {
  name: string;
  config: CommandConfig;
  callback: (() => void) | undefined;
  priority: number;
};

// Motion command matcher
function matchesMotionCommand(
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

// Charge command state
type ChargeState = {
  chargeStartTime: number | null;
  lastChargeEndTime: number | null;
};

function checkChargeCommand(
  state: ChargeState,
  event: InputRecord,
  chargeDirections: Direction[],
  releaseDirection: Direction,
  button: Button,
  chargeTime: number,
  inputWindow: number,
): { matched: boolean; newState: ChargeState } {
  const { direction, punch, kick, timestamp } = event;
  const buttonPressed = button === "punch" ? punch : kick;
  const isCharging = chargeDirections.includes(direction);

  const newState = { ...state };

  if (isCharging) {
    if (newState.chargeStartTime === null) {
      newState.chargeStartTime = timestamp;
    }
  } else {
    if (newState.chargeStartTime !== null) {
      const chargedDuration = timestamp - newState.chargeStartTime;
      if (chargedDuration >= chargeTime) {
        newState.lastChargeEndTime = timestamp;
      }
    }
    newState.chargeStartTime = null;
  }

  if (
    direction === releaseDirection &&
    buttonPressed &&
    newState.lastChargeEndTime !== null
  ) {
    const timeSinceCharge = timestamp - newState.lastChargeEndTime;
    if (timeSinceCharge <= inputWindow) {
      newState.lastChargeEndTime = null;
      return { matched: true, newState };
    }
  }

  return { matched: false, newState };
}

// Button sequence state
type SequenceState = {
  sequenceIndex: number;
  lastInputTime: number;
};

function checkButtonSequence(
  state: SequenceState,
  event: InputRecord,
  sequence: SequenceStep[],
  inputWindow: number,
): { matched: boolean; newState: SequenceState } {
  const { direction, punch, kick, timestamp } = event;

  const newState = { ...state };

  if (
    newState.lastInputTime > 0 &&
    timestamp - newState.lastInputTime > inputWindow
  ) {
    newState.sequenceIndex = 0;
  }

  const currentStep = sequence[newState.sequenceIndex];
  let stepMatched = false;

  if (currentStep.type === "punch" && punch) {
    stepMatched = true;
  } else if (currentStep.type === "kick" && kick) {
    stepMatched = true;
  } else if (
    currentStep.type === "direction" &&
    direction === currentStep.direction &&
    !punch &&
    !kick
  ) {
    stepMatched = true;
  }

  if (stepMatched) {
    newState.lastInputTime = timestamp;
    newState.sequenceIndex++;

    if (newState.sequenceIndex >= sequence.length) {
      newState.sequenceIndex = 0;
      newState.lastInputTime = 0;
      return { matched: true, newState };
    }
  } else if (punch || kick || direction !== "neutral") {
    if (sequence[0].type === "punch" && punch) {
      newState.sequenceIndex = 1;
      newState.lastInputTime = timestamp;
    } else {
      newState.sequenceIndex = 0;
      newState.lastInputTime = 0;
    }
  }

  return { matched: false, newState };
}

export type UseUnifiedCommandDetectorOptions = {
  side?: Side;
  commands: CommandDefinition[];
};

export function useUnifiedCommandDetector({
  side = "1P",
  commands,
}: UseUnifiedCommandDetectorOptions) {
  const inputBuffer = useRef<InputRecord[]>([]);
  const chargeStates = useRef<Map<string, ChargeState>>(new Map());
  const sequenceStates = useRef<Map<string, SequenceState>>(new Map());
  const callbackRefs = useRef<Map<string, () => void>>(new Map());

  // Update callback refs
  for (const cmd of commands) {
    if (cmd.callback) {
      callbackRefs.current.set(cmd.name, cmd.callback);
    }
  }

  // Sort by priority (lower number = higher priority)
  const sortedCommands = [...commands]
    .filter((cmd) => cmd.callback !== undefined)
    .sort((a, b) => a.priority - b.priority);

  const handleInput = useCallback(
    (event: {
      direction: Direction;
      punch: boolean;
      kick: boolean;
      timestamp: number;
    }) => {
      const { direction, punch, kick, timestamp } = event;
      const inputRecord: InputRecord = { direction, punch, kick, timestamp };

      // Add to buffer and clean old inputs
      inputBuffer.current.push(inputRecord);
      const maxWindow = 2000; // Keep enough history
      inputBuffer.current = inputBuffer.current.filter(
        (i) => timestamp - i.timestamp <= maxWindow,
      );

      // Check commands in priority order
      for (const cmd of sortedCommands) {
        const callback = callbackRefs.current.get(cmd.name);
        if (!callback) continue;

        let matched = false;

        if (cmd.config.type === "motion") {
          const sequence =
            side === "1P" ? cmd.config.sequence1P : cmd.config.sequence2P;
          matched = matchesMotionCommand(
            inputBuffer.current,
            sequence,
            cmd.config.button,
            cmd.config.inputWindow,
          );
        } else if (cmd.config.type === "charge") {
          const chargeDirections =
            side === "1P"
              ? cmd.config.chargeDirections1P
              : cmd.config.chargeDirections2P;
          const releaseDirection =
            side === "1P"
              ? cmd.config.releaseDirection1P
              : cmd.config.releaseDirection2P;

          const state = chargeStates.current.get(cmd.name) ?? {
            chargeStartTime: null,
            lastChargeEndTime: null,
          };

          const result = checkChargeCommand(
            state,
            inputRecord,
            chargeDirections,
            releaseDirection,
            cmd.config.button,
            cmd.config.chargeTime,
            cmd.config.inputWindow,
          );

          chargeStates.current.set(cmd.name, result.newState);
          matched = result.matched;
        } else if (cmd.config.type === "buttonSequence") {
          const sequence =
            side === "1P" ? cmd.config.sequence1P : cmd.config.sequence2P;

          const state = sequenceStates.current.get(cmd.name) ?? {
            sequenceIndex: 0,
            lastInputTime: 0,
          };

          const result = checkButtonSequence(
            state,
            inputRecord,
            sequence,
            cmd.config.inputWindow,
          );

          sequenceStates.current.set(cmd.name, result.newState);
          matched = result.matched;
        }

        if (matched) {
          // Clear input buffer to prevent lower priority commands from matching
          inputBuffer.current = [];
          // Reset all sequence states
          sequenceStates.current.clear();
          callback();
          return; // Only fire highest priority match
        }
      }
    },
    [side, sortedCommands],
  );

  useKeyboardInput({ onInput: handleInput });
}
