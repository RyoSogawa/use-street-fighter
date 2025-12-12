import { useCallback, useRef } from "react";
import type { Button, Direction, Side } from "./types";
import { useKeyboardInput } from "./useKeyboardInput";

type ChargeCommandConfig = {
  chargeDirection1P: Direction;
  chargeDirection2P: Direction;
  releaseDirection1P: Direction;
  releaseDirection2P: Direction;
  button: Button;
};

const DEFAULT_CHARGE_TIME = 800;
const DEFAULT_INPUT_WINDOW = 500;

type UseChargeCommandOptions = {
  side?: Side;
  onCommand: () => void;
  chargeTime?: number;
  inputWindow?: number;
  config: ChargeCommandConfig;
  enabled?: boolean;
};

export function useChargeCommand({
  side = "1P",
  onCommand,
  chargeTime = DEFAULT_CHARGE_TIME,
  inputWindow = DEFAULT_INPUT_WINDOW,
  config,
  enabled = true,
}: UseChargeCommandOptions) {
  const chargeStartTime = useRef<number | null>(null);
  const lastChargeEndTime = useRef<number | null>(null);
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;

  const chargeDirection =
    side === "1P" ? config.chargeDirection1P : config.chargeDirection2P;
  const releaseDirection =
    side === "1P" ? config.releaseDirection1P : config.releaseDirection2P;

  const handleInput = useCallback(
    (event: {
      direction: Direction;
      punch: boolean;
      kick: boolean;
      timestamp: number;
    }) => {
      if (!enabled) return;

      const { direction, punch, kick, timestamp } = event;
      const buttonPressed = config.button === "punch" ? punch : kick;

      // Check if currently charging
      if (direction === chargeDirection) {
        if (chargeStartTime.current === null) {
          chargeStartTime.current = timestamp;
        }
      } else {
        // Direction changed - check if we had enough charge
        if (chargeStartTime.current !== null) {
          const chargedDuration = timestamp - chargeStartTime.current;
          if (chargedDuration >= chargeTime) {
            lastChargeEndTime.current = timestamp;
          }
        }
        chargeStartTime.current = null;
      }

      // Check for release direction + button
      if (
        direction === releaseDirection &&
        buttonPressed &&
        lastChargeEndTime.current !== null
      ) {
        const timeSinceCharge = timestamp - lastChargeEndTime.current;
        if (timeSinceCharge <= inputWindow) {
          lastChargeEndTime.current = null;
          onCommandRef.current();
        }
      }
    },
    [
      enabled,
      chargeDirection,
      releaseDirection,
      chargeTime,
      inputWindow,
      config.button,
    ],
  );

  useKeyboardInput({ onInput: handleInput });
}
