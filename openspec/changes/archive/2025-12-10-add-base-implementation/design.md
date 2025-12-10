## Context
Initial implementation of the use-street-fighter library. Need to establish patterns that will scale to support multiple command types in the future.

## Goals / Non-Goals
- Goals:
  - Working `useHadoken` hook with 1P/2P side support
  - Extensible architecture for future commands (Shoryuken, etc.)
  - Clean separation between input handling and command detection
- Non-Goals:
  - WASD support (future enhancement)
  - Mobile/touch input
  - npm publishing (separate effort)

## Decisions

### Key Binding Architecture
- **Decision**: Use a key mapping abstraction layer
- **Rationale**: Allows future support for WASD and custom key bindings without changing core logic
- **Implementation**: `KeyMap` type maps logical directions/buttons to physical keys

### Input Detection Flow
```
KeyboardEvent → useKeyboardInput → Input Buffer → Command Matcher → Callback
```

### Direction Handling for 1P/2P
- 1P side: → is forward (right), ← is back (left)
- 2P side: ← is forward (left), → is back (right)
- Hadouken: ↓↘→+P (1P) = ↓↙←+P (2P) in terms of physical keys

### Default Key Bindings
| Logical | Physical Key |
|---------|--------------|
| Up      | ArrowUp      |
| Down    | ArrowDown    |
| Left    | ArrowLeft    |
| Right   | ArrowRight   |
| Punch   | P            |

### Input Window
- Default: 500ms window to complete command
- Configurable via hook options

## Risks / Trade-offs
- **Risk**: Input buffer memory growth → Mitigation: Clear old inputs beyond window
- **Trade-off**: Simplicity vs accuracy (not frame-perfect like real fighting games)

## Open Questions
- None currently blocking implementation
