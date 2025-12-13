## 1. Core Implementation
- [ ] 1.1 Create command matcher utility functions (extract from useCommand.ts)
- [ ] 1.2 Create `useUnifiedCommandDetector` internal hook with priority-based matching
- [ ] 1.3 Refactor `useStreetFightingCommand` to use unified detector instead of multiple `useCommand` calls

## 2. Testing
- [ ] 2.1 Add test: Shinku Hadouken input triggers only onShinkuHadouken (not onHadouken)
- [ ] 2.2 Add test: Hadouken input triggers onHadouken when onShinkuHadouken is not registered
- [ ] 2.3 Add test: Priority order is respected across all command types

## 3. Validation
- [ ] 3.1 Run all existing tests and ensure passing
- [ ] 3.2 Manual test in demo: verify Shinku Hadouken doesn't trigger Hadouken
- [ ] 3.3 Run lint and build
