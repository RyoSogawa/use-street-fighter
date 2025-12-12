import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  KEY_CODES,
  pressAndRelease,
  pressKey,
  releaseKey,
  simulateShinkuHadouken1P,
  simulateShinkuHadouken2P,
} from "./test-utils";
import { useShinkuHadouken } from "./useShinkuHadouken";

describe("useShinkuHadouken", () => {
  it("should detect 1P side Shinku Hadouken command", () => {
    const onCommand = vi.fn();
    renderHook(() => useShinkuHadouken({ onCommand }));

    simulateShinkuHadouken1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should detect 2P side Shinku Hadouken command", () => {
    const onCommand = vi.fn();
    renderHook(() => useShinkuHadouken({ side: "2P", onCommand }));

    simulateShinkuHadouken2P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should not trigger on single Hadouken motion", () => {
    const onCommand = vi.fn();
    renderHook(() => useShinkuHadouken({ onCommand }));

    // Only one 236 motion
    pressAndRelease(KEY_CODES.down);
    pressKey(KEY_CODES.down);
    pressKey(KEY_CODES.right);
    releaseKey(KEY_CODES.down);
    releaseKey(KEY_CODES.right);
    pressAndRelease(KEY_CODES.right);
    pressAndRelease(KEY_CODES.punch);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should use default 1P side when side is not specified", () => {
    const onCommand = vi.fn();
    renderHook(() => useShinkuHadouken({ onCommand }));

    simulateShinkuHadouken1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });
});
