import { useCallback, useEffect, useMemo, useRef } from "react";
import { DEFAULT_KEY_MAP, type Direction, type KeyMap } from "./types";

type KeyState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  punch: boolean;
  kick: boolean;
};

type InputEvent = {
  direction: Direction;
  punch: boolean;
  kick: boolean;
  timestamp: number;
};

type UseKeyboardInputOptions = {
  keyMap?: Partial<KeyMap>;
  onInput: (event: InputEvent) => void;
};

function getDirection(state: KeyState): Direction {
  const { up, down, left, right } = state;

  if (up && left) return "up-left";
  if (up && right) return "up-right";
  if (down && left) return "down-left";
  if (down && right) return "down-right";
  if (up) return "up";
  if (down) return "down";
  if (left) return "left";
  if (right) return "right";
  return "neutral";
}

export function useKeyboardInput({ keyMap, onInput }: UseKeyboardInputOptions) {
  const mergedKeyMap = useMemo(
    () => ({ ...DEFAULT_KEY_MAP, ...keyMap }),
    [keyMap],
  );
  const keyState = useRef<KeyState>({
    up: false,
    down: false,
    left: false,
    right: false,
    punch: false,
    kick: false,
  });
  const onInputRef = useRef(onInput);
  onInputRef.current = onInput;

  const emitInput = useCallback(() => {
    const state = keyState.current;
    onInputRef.current({
      direction: getDirection(state),
      punch: state.punch,
      kick: state.kick,
      timestamp: Date.now(),
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = keyState.current;
      let changed = false;

      if (e.code === mergedKeyMap.up && !state.up) {
        state.up = true;
        changed = true;
      }
      if (e.code === mergedKeyMap.down && !state.down) {
        state.down = true;
        changed = true;
      }
      if (e.code === mergedKeyMap.left && !state.left) {
        state.left = true;
        changed = true;
      }
      if (e.code === mergedKeyMap.right && !state.right) {
        state.right = true;
        changed = true;
      }
      if (e.code === mergedKeyMap.punch && !state.punch) {
        state.punch = true;
        changed = true;
      }
      if (e.code === mergedKeyMap.kick && !state.kick) {
        state.kick = true;
        changed = true;
      }

      if (changed) {
        emitInput();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const state = keyState.current;
      let changed = false;

      if (e.code === mergedKeyMap.up) {
        state.up = false;
        changed = true;
      }
      if (e.code === mergedKeyMap.down) {
        state.down = false;
        changed = true;
      }
      if (e.code === mergedKeyMap.left) {
        state.left = false;
        changed = true;
      }
      if (e.code === mergedKeyMap.right) {
        state.right = false;
        changed = true;
      }
      if (e.code === mergedKeyMap.punch) {
        state.punch = false;
        changed = true;
      }
      if (e.code === mergedKeyMap.kick) {
        state.kick = false;
        changed = true;
      }

      if (changed) {
        emitInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [mergedKeyMap, emitInput]);
}
