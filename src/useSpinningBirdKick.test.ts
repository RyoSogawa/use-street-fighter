import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  KEY_CODES,
  pressKey,
  releaseKey,
  simulateSpinningBirdKick,
  wait,
} from "./test-utils";
import { useSpinningBirdKick } from "./useSpinningBirdKick";

describe("useSpinningBirdKick", () => {
  it("should detect Spinning Bird Kick command", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSpinningBirdKick({ onCommand }));

    await simulateSpinningBirdKick();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should detect 2P side Spinning Bird Kick command", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSpinningBirdKick({ side: "2P", onCommand }));

    // Same command for 2P (down charge up)
    await simulateSpinningBirdKick();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should not trigger with insufficient charge time", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSpinningBirdKick({ onCommand, chargeTime: 800 }));

    // Only charge for 300ms (insufficient)
    pressKey(KEY_CODES.down);
    await wait(300);
    releaseKey(KEY_CODES.down);
    pressKey(KEY_CODES.up);
    pressKey(KEY_CODES.kick);
    releaseKey(KEY_CODES.up);
    releaseKey(KEY_CODES.kick);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should work with custom charge time", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSpinningBirdKick({ onCommand, chargeTime: 200 }));

    await simulateSpinningBirdKick(250);

    expect(onCommand).toHaveBeenCalledTimes(1);
  });
});
