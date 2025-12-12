## 1. Core Implementation
- [x] 1.1 Add `ChargeCommandOptions` type with `chargeTime` option
- [x] 1.2 Create `useChargeCommand` hook for charge command detection
- [x] 1.3 Create `useSonicBoom` hook (←charge→+P / [4]6P)
- [x] 1.4 Create `useSpinningBirdKick` hook (↓charge↑+K / [2]8K)
- [x] 1.5 Export new hooks and types from `src/index.ts`
- [x] 1.6 Add JSDoc documentation to new hooks

## 2. Unified Hook Update
- [x] 2.1 Add `onSonicBoom` and `onSpinningBirdKick` to `UseStreetFighterOptions`
- [x] 2.2 Update `useStreetFighter` to support charge commands

## 3. Demo Update
- [x] 3.1 Add Sonic Boom and Spinning Bird Kick command cards
- [x] 3.2 Update effect overlay with new command styles

## 4. Documentation
- [x] 4.1 Update README with charge command documentation

## 5. Validation
- [x] 5.1 Run lint and build
- [x] 5.2 Manual test all commands in demo
