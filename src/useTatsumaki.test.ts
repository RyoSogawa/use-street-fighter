import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  KEY_CODES,
  pressAndRelease,
  simulateTatsumaki1P,
  simulateTatsumaki2P,
} from "./test-utils";
import { useTatsumaki } from "./useTatsumaki";

describe("useTatsumaki", () => {
  it("should detect 1P side Tatsumaki command", () => {
    const onCommand = vi.fn();
    renderHook(() => useTatsumaki({ onCommand }));

    simulateTatsumaki1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should detect 2P side Tatsumaki command", () => {
    const onCommand = vi.fn();
    renderHook(() => useTatsumaki({ side: "2P", onCommand }));

    simulateTatsumaki2P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should not trigger on incomplete command", () => {
    const onCommand = vi.fn();
    renderHook(() => useTatsumaki({ onCommand }));

    // Only down and down-left, no left + kick
    pressAndRelease(KEY_CODES.down);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should use default 1P side when side is not specified", () => {
    const onCommand = vi.fn();
    renderHook(() => useTatsumaki({ onCommand }));

    simulateTatsumaki1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });
});
