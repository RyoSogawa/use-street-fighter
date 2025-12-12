# Change: Add Unit Tests

## Why
The project currently has no test infrastructure. Adding unit tests will ensure hook behavior correctness and prevent regressions as the library grows.

## What Changes
- Add Vitest as test framework
- Add React Testing Library for hook testing
- Create test utilities for simulating keyboard events
- Write unit tests for all hooks covering spec scenarios

## Impact
- Affected specs: testing (new)
- Affected code: package.json, vitest.config.ts, src/**/*.test.ts (new files)
