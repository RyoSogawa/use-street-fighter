import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  KEY_CODES,
  pressAndRelease,
  simulateShunGokuSatsu1P,
  simulateShunGokuSatsu2P,
  wait,
} from "./test-utils";
import { useShunGokuSatsu } from "./useShunGokuSatsu";

describe("useShunGokuSatsu", () => {
  it("should detect 1P side Shun Goku Satsu command", () => {
    const onCommand = vi.fn();
    renderHook(() => useShunGokuSatsu({ onCommand }));

    simulateShunGokuSatsu1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should detect 2P side Shun Goku Satsu command", () => {
    const onCommand = vi.fn();
    renderHook(() => useShunGokuSatsu({ side: "2P", onCommand }));

    simulateShunGokuSatsu2P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should not trigger on incomplete sequence", () => {
    const onCommand = vi.fn();
    renderHook(() => useShunGokuSatsu({ onCommand }));

    // Only P P (incomplete)
    pressAndRelease(KEY_CODES.punch);
    pressAndRelease(KEY_CODES.punch);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should not trigger when input window expires", async () => {
    const onCommand = vi.fn();
    renderHook(() => useShunGokuSatsu({ onCommand, inputWindow: 100 }));

    pressAndRelease(KEY_CODES.punch);
    pressAndRelease(KEY_CODES.punch);
    await wait(150);
    pressAndRelease(KEY_CODES.right);
    pressAndRelease(KEY_CODES.kick);
    pressAndRelease(KEY_CODES.punch);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should use default 1P side when side is not specified", () => {
    const onCommand = vi.fn();
    renderHook(() => useShunGokuSatsu({ onCommand }));

    simulateShunGokuSatsu1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });
});
