# Add useStreetFighter Unified Hook

## Why
Currently, users must call each command hook separately (`useHadoken`, `useShoryuken`, `useTatsumaki`), which creates redundant keyboard event listeners and requires more boilerplate code. A unified hook would simplify usage and improve performance by sharing a single keyboard listener.

## What Changes
- Add `useStreetFighter` hook that accepts optional callbacks for each command
- Only commands with provided callbacks are activated (others are ignored)
- Share keyboard input handling across all active commands
- Update demo to use the new unified hook

## Impact
- Affected specs: `command-input` (add 1 new requirement)
- Affected code: `src/useStreetFighter.ts`, `src/index.ts`, `demo/src/App.tsx`
- Backward compatible: existing individual hooks remain available
