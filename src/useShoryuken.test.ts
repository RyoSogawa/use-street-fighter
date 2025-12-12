import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  KEY_CODES,
  pressAndRelease,
  simulateShoryuken1P,
  simulateShoryuken2P,
} from "./test-utils";
import { useShoryuken } from "./useShoryuken";

describe("useShoryuken", () => {
  it("should detect 1P side Shoryuken command", () => {
    const onCommand = vi.fn();
    renderHook(() => useShoryuken({ onCommand }));

    simulateShoryuken1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should detect 2P side Shoryuken command", () => {
    const onCommand = vi.fn();
    renderHook(() => useShoryuken({ side: "2P", onCommand }));

    simulateShoryuken2P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should not trigger on incomplete command", () => {
    const onCommand = vi.fn();
    renderHook(() => useShoryuken({ onCommand }));

    // Only right and down, no down-right + punch
    pressAndRelease(KEY_CODES.right);
    pressAndRelease(KEY_CODES.down);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should use default 1P side when side is not specified", () => {
    const onCommand = vi.fn();
    renderHook(() => useShoryuken({ onCommand }));

    simulateShoryuken1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });
});
