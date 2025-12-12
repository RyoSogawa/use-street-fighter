import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  KEY_CODES,
  pressKey,
  releaseKey,
  simulateSonicBoom1P,
  simulateSonicBoom2P,
  wait,
} from "./test-utils";
import { useSonicBoom } from "./useSonicBoom";

describe("useSonicBoom", () => {
  it("should detect 1P side Sonic Boom command", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSonicBoom({ onCommand }));

    await simulateSonicBoom1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should detect 2P side Sonic Boom command", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSonicBoom({ side: "2P", onCommand }));

    await simulateSonicBoom2P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should not trigger with insufficient charge time", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSonicBoom({ onCommand, chargeTime: 800 }));

    // Only charge for 300ms (insufficient)
    pressKey(KEY_CODES.left);
    await wait(300);
    releaseKey(KEY_CODES.left);
    pressKey(KEY_CODES.right);
    pressKey(KEY_CODES.punch);
    releaseKey(KEY_CODES.right);
    releaseKey(KEY_CODES.punch);

    expect(onCommand).not.toHaveBeenCalled();
  });

  it("should work with custom charge time", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSonicBoom({ onCommand, chargeTime: 200 }));

    await simulateSonicBoom1P(250);

    expect(onCommand).toHaveBeenCalledTimes(1);
  });

  it("should use default 1P side when side is not specified", async () => {
    const onCommand = vi.fn();
    renderHook(() => useSonicBoom({ onCommand }));

    await simulateSonicBoom1P();

    expect(onCommand).toHaveBeenCalledTimes(1);
  });
});
