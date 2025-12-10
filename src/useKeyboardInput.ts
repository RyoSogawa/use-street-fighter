import { useCallback, useEffect, useRef } from "react";
import type { Direction } from "./types";

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
  onInput: (event: InputEvent) => void;
};

const UP_KEYS = ["ArrowUp", "KeyW"];
const DOWN_KEYS = ["ArrowDown", "KeyS"];
const LEFT_KEYS = ["ArrowLeft", "KeyA"];
const RIGHT_KEYS = ["ArrowRight", "KeyD"];
const PUNCH_KEYS = ["KeyP"];
const KICK_KEYS = ["KeyK"];

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

export function useKeyboardInput({ onInput }: UseKeyboardInputOptions) {
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

      if (UP_KEYS.includes(e.code) && !state.up) {
        state.up = true;
        changed = true;
      }
      if (DOWN_KEYS.includes(e.code) && !state.down) {
        state.down = true;
        changed = true;
      }
      if (LEFT_KEYS.includes(e.code) && !state.left) {
        state.left = true;
        changed = true;
      }
      if (RIGHT_KEYS.includes(e.code) && !state.right) {
        state.right = true;
        changed = true;
      }
      if (PUNCH_KEYS.includes(e.code) && !state.punch) {
        state.punch = true;
        changed = true;
      }
      if (KICK_KEYS.includes(e.code) && !state.kick) {
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

      if (UP_KEYS.includes(e.code)) {
        state.up = false;
        changed = true;
      }
      if (DOWN_KEYS.includes(e.code)) {
        state.down = false;
        changed = true;
      }
      if (LEFT_KEYS.includes(e.code)) {
        state.left = false;
        changed = true;
      }
      if (RIGHT_KEYS.includes(e.code)) {
        state.right = false;
        changed = true;
      }
      if (PUNCH_KEYS.includes(e.code)) {
        state.punch = false;
        changed = true;
      }
      if (KICK_KEYS.includes(e.code)) {
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
  }, [emitInput]);
}
