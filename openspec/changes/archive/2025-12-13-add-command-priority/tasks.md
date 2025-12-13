## 1. Core Implementation
- [x] 1.1 Create command matcher utility functions (extract from useCommand.ts)
- [x] 1.2 Create `useUnifiedCommandDetector` internal hook with priority-based matching
- [x] 1.3 Refactor `useStreetFightingCommand` to use unified detector instead of multiple `useCommand` calls

## 2. Testing
- [x] 2.1 Add test: Shinku Hadouken input triggers only onShinkuHadouken (not onHadouken)
- [x] 2.2 Add test: Hadouken input triggers onHadouken when onShinkuHadouken is not registered
- [x] 2.3 Add test: Priority order is respected across all command types

## 3. Validation
- [x] 3.1 Run all existing tests and ensure passing
- [x] 3.2 Manual test in demo: verify Shinku Hadouken doesn't trigger Hadouken
- [x] 3.3 Run lint and build
