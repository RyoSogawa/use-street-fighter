# Add Command Priority for Exclusive Firing

## Why
Currently, when Shinku Hadouken (236236P) is successfully entered, the final portion (236P) also matches the Hadouken command, causing both callbacks to fire. This is unintended behavior—only the more complex command should trigger.

## What Changes
- Add command priority system to `useStreetFightingCommand` hook
- Define fixed priority order (higher priority commands checked first):
  1. Shun Goku Satsu (P P → K P)
  2. Shinku Hadouken (236236P)
  3. Sonic Boom ([4]6P)
  4. Spinning Bird Kick ([2]8K)
  5. Shoryuken (623P)
  6. Tatsumaki (214K)
  7. Hadouken (236P)
- When multiple commands match the same input, only the highest priority command fires
- Shared input buffer across all commands within `useStreetFightingCommand`

## Impact
- Affected specs: `command-input` (modify Unified Command Hook requirement)
- Affected code: `src/useStreetFightingCommand.ts`, `src/useCommand.ts` (or new unified command detector)
- Backward compatible: Individual hooks (`useHadoken`, etc.) remain unchanged with current behavior
