import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  simulateHadouken1P,
  simulateHadouken2P,
  simulateShinkuHadouken1P,
  simulateShoryuken1P,
  simulateShunGokuSatsu1P,
  simulateSonicBoom1P,
  simulateSpinningBirdKick,
  simulateTatsumaki1P,
} from "./test-utils";
import { useStreetFightingCommand } from "./useStreetFightingCommand";

describe("useStreetFightingCommand", () => {
  it("should detect Hadouken when only onHadouken is provided", () => {
    const onHadouken = vi.fn();
    renderHook(() => useStreetFightingCommand({ onHadouken }));

    simulateHadouken1P();

    expect(onHadouken).toHaveBeenCalledTimes(1);
  });

  it("should detect multiple commands when multiple callbacks are provided", () => {
    const onHadouken = vi.fn();
    const onTatsumaki = vi.fn();
    renderHook(() => useStreetFightingCommand({ onHadouken, onTatsumaki }));

    simulateHadouken1P();
    simulateTatsumaki1P();

    expect(onHadouken).toHaveBeenCalledTimes(1);
    expect(onTatsumaki).toHaveBeenCalledTimes(1);
  });

  it("should detect charge commands when callbacks are provided", async () => {
    const onSonicBoom = vi.fn();
    const onSpinningBirdKick = vi.fn();

    renderHook(() =>
      useStreetFightingCommand({
        onSonicBoom,
        onSpinningBirdKick,
      }),
    );

    await simulateSonicBoom1P();
    expect(onSonicBoom).toHaveBeenCalled();

    await simulateSpinningBirdKick();
    expect(onSpinningBirdKick).toHaveBeenCalled();
  });

  it("should use 2P side for all commands when side is set to 2P", () => {
    const onHadouken = vi.fn();
    renderHook(() => useStreetFightingCommand({ side: "2P", onHadouken }));

    // 1P command should not work
    simulateHadouken1P();
    expect(onHadouken).not.toHaveBeenCalled();

    // 2P command should work
    simulateHadouken2P();
    expect(onHadouken).toHaveBeenCalledTimes(1);
  });

  it("should not detect commands when callback is not provided", () => {
    const onHadouken = vi.fn();
    renderHook(() => useStreetFightingCommand({ onHadouken }));

    // Tatsumaki command should not trigger Hadouken since onTatsumaki is not provided
    simulateTatsumaki1P();
    expect(onHadouken).not.toHaveBeenCalled();
  });
});
