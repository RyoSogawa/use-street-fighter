# Add Shun Goku Satsu Command

## Why
The Shun Goku Satsu (Raging Demon) is one of the most iconic secret commands in fighting game history. Adding this command expands the library to support Akuma's signature move and provides an example of button-sequence commands (as opposed to motion or charge commands).

## What Changes
- Add `useShunGokuSatsu` hook for button sequence command (P P → K P)
- Add `useButtonSequence` utility for button-only command detection
- Update `useStreetFighter` to support new command via `onShunGokuSatsu`
- Update demo to show command as "???" until successfully executed, then reveal

## Impact
- Affected specs: `command-input` (add 1 new requirement)
- Affected code: `src/useShunGokuSatsu.ts`, `src/useButtonSequence.ts`, `src/useStreetFighter.ts`, `src/types.ts`, `src/index.ts`, `demo/`
- Backward compatible: existing hooks remain unchanged
