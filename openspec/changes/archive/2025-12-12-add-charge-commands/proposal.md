# Add Sonic Boom and Spinning Bird Kick Commands

## Why
Currently, the library only supports motion commands (↓↘→ etc.). Many classic Street Fighter characters use charge commands, where a direction must be held for a period before releasing in the opposite direction + button. Adding Sonic Boom and Spinning Bird Kick expands the library to support Guile and Chun-Li's signature moves.

## What Changes
- Add `useSonicBoom` hook for horizontal charge command (←charge→+P / [4]6P)
- Add `useSpinningBirdKick` hook for vertical charge command (↓charge↑+K / [2]8K)
- Add `useChargeCommand` utility for charge command detection
- Add `chargeTime` option (default 800ms) for configuring charge duration
- Update `useStreetFighter` to support new commands via `onSonicBoom` and `onSpinningBirdKick`
- Update demo to display all five commands

## Impact
- Affected specs: `command-input` (add 2 new requirements)
- Affected code: `src/useSonicBoom.ts`, `src/useSpinningBirdKick.ts`, `src/useChargeCommand.ts`, `src/useStreetFighter.ts`, `src/types.ts`, `src/index.ts`, `demo/`
- Backward compatible: existing hooks remain unchanged
