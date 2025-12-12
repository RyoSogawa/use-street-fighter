import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { KEY_CODES, pressKey, releaseKey } from "./test-utils";
import { useKeyboardInput } from "./useKeyboardInput";

describe("useKeyboardInput", () => {
  it("should emit input on keydown", () => {
    const onInput = vi.fn();
    renderHook(() => useKeyboardInput({ onInput }));

    pressKey(KEY_CODES.down);

    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: "down",
        punch: false,
        kick: false,
      }),
    );
  });

  it("should detect diagonal directions", () => {
    const onInput = vi.fn();
    renderHook(() => useKeyboardInput({ onInput }));

    pressKey(KEY_CODES.down);
    pressKey(KEY_CODES.right);

    expect(onInput).toHaveBeenLastCalledWith(
      expect.objectContaining({
        direction: "down-right",
      }),
    );
  });

  it("should detect punch button", () => {
    const onInput = vi.fn();
    renderHook(() => useKeyboardInput({ onInput }));

    pressKey(KEY_CODES.punch);

    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({
        punch: true,
        kick: false,
      }),
    );
  });

  it("should detect kick button", () => {
    const onInput = vi.fn();
    renderHook(() => useKeyboardInput({ onInput }));

    pressKey(KEY_CODES.kick);

    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({
        punch: false,
        kick: true,
      }),
    );
  });

  it("should support WASD keys", () => {
    const onInput = vi.fn();
    renderHook(() => useKeyboardInput({ onInput }));

    pressKey(KEY_CODES.s);

    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: "down",
      }),
    );
  });

  it("should emit input on keyup", () => {
    const onInput = vi.fn();
    renderHook(() => useKeyboardInput({ onInput }));

    pressKey(KEY_CODES.down);
    releaseKey(KEY_CODES.down);

    expect(onInput).toHaveBeenLastCalledWith(
      expect.objectContaining({
        direction: "neutral",
      }),
    );
  });

  it("should detect all diagonal directions", () => {
    const onInput = vi.fn();
    renderHook(() => useKeyboardInput({ onInput }));

    // up-left
    pressKey(KEY_CODES.up);
    pressKey(KEY_CODES.left);
    expect(onInput).toHaveBeenLastCalledWith(
      expect.objectContaining({ direction: "up-left" }),
    );
    releaseKey(KEY_CODES.up);
    releaseKey(KEY_CODES.left);

    // up-right
    pressKey(KEY_CODES.up);
    pressKey(KEY_CODES.right);
    expect(onInput).toHaveBeenLastCalledWith(
      expect.objectContaining({ direction: "up-right" }),
    );
    releaseKey(KEY_CODES.up);
    releaseKey(KEY_CODES.right);

    // down-left
    pressKey(KEY_CODES.down);
    pressKey(KEY_CODES.left);
    expect(onInput).toHaveBeenLastCalledWith(
      expect.objectContaining({ direction: "down-left" }),
    );
    releaseKey(KEY_CODES.down);
    releaseKey(KEY_CODES.left);

    // down-right
    pressKey(KEY_CODES.down);
    pressKey(KEY_CODES.right);
    expect(onInput).toHaveBeenLastCalledWith(
      expect.objectContaining({ direction: "down-right" }),
    );
  });
});
