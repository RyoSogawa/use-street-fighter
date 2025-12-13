## Context
When using `useStreetFightingCommand` with both Shinku Hadouken and Hadouken callbacks, entering 236236P triggers both commands because the input buffer is managed independently per `useCommand` call.

## Goals / Non-Goals
- Goals:
  - Single command fires when multiple commands match the same input
  - Fixed priority order defined by implementation (not user-configurable)
  - Preserve existing behavior for individual hooks (useHadoken, etc.)
- Non-Goals:
  - User-defined priority configuration
  - Dynamic priority changes at runtime

## Decisions

### Priority Order
Priority is based on command complexity and rarity (more complex/rare commands take precedence):

| Priority | Command | Notation | Rationale |
|----------|---------|----------|-----------|
| 1 | Shun Goku Satsu | P P → K P | Rarest, secret command |
| 2 | Shinku Hadouken | 236236P | Super command (double motion) |
| 3 | Sonic Boom | [4]6P | Charge command |
| 4 | Spinning Bird Kick | [2]8K | Charge command |
| 5 | Shoryuken | 623P | Motion command |
| 6 | Tatsumaki | 214K | Motion command |
| 7 | Hadouken | 236P | Most basic motion command |

### Architecture Approach
**Option A: Centralized Command Matching (Selected)**
- Single input buffer shared across all commands
- Check commands in priority order on each input
- First match wins, buffer cleared
- Pros: Clean priority handling, single source of truth
- Cons: Requires refactoring useStreetFightingCommand

**Option B: Post-hoc Deduplication**
- Keep current architecture with independent useCommand calls
- Add debounce/deduplication layer
- Pros: Minimal changes
- Cons: Complex timing logic, race conditions

### Implementation Details
- Create `useUnifiedCommandDetector` internal hook
- Takes array of command configs with priority
- Single `useKeyboardInput` subscription
- On each input, check all commands in priority order
- First successful match triggers callback and clears buffer

## Risks / Trade-offs
- Risk: Performance with many commands → Mitigation: Early exit on first match
- Trade-off: Individual hooks don't benefit from priority (intentional—they're independent)

## Open Questions
- None currently blocking implementation
