import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  KEY_CODES,
  pressAndRelease,
  pressKey,
  releaseKey,
  simulateHadouken1P,
  simulateHadouken2P,
  wait,
} from "./test-utils";
import { useHadoken } from "./useHadoken";

describe("useHadoken", () => {
  it("should detect 1P side Hadouken command", () => {
    const onCommand = vi.fn();
    renderHook(() => useHadoken({ onCommand }));

    simulateHadouken1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should detect 2P side Hadouken command", () => {
    const onCommand = vi.fn();
    renderHook(() => useHadoken({ side: "2P", onCommand }));

    simulateHadouken2P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should not trigger on incomplete command", () => {
    const onCommand = vi.fn();
    renderHook(() => useHadoken({ onCommand }));

    // Only down and down-right, no right + punch
    pressKey(KEY_CODES.down);
    releaseKey(KEY_CODES.down);
    pressKey(KEY_CODES.down);
    pressKey(KEY_CODES.right);
    releaseKey(KEY_CODES.down);
    releaseKey(KEY_CODES.right);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should not trigger when input window expires", async () => {
    const onCommand = vi.fn();
    renderHook(() => useHadoken({ onCommand, inputWindow: 100 }));

    pressAndRelease(KEY_CODES.down);
    await wait(150);
    pressAndRelease(KEY_CODES.punch);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should use default 1P side when side is not specified", () => {
    const onCommand = vi.fn();
    renderHook(() => useHadoken({ onCommand }));

    simulateHadouken1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });
});
