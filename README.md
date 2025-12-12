# use-street-fighter

React custom hooks for detecting Street Fighter-style command inputs.

> **Disclaimer**: This is an unofficial fan-made project and is not affiliated with, endorsed by, or connected to Capcom or the Street Fighter franchise in any way. "Street Fighter" is a registered trademark of Capcom Co., Ltd.

## Installation

```bash
npm install use-street-fighter
```

## Commands

| Command | Input | Notation |
|---------|-------|----------|
| Hadouken | ↓↘→+P | 236P |
| Shoryuken | →↓↘+P | 623P |
| Tatsumaki | ↓↙←+K | 214K |

## Usage

### useStreetFighter (Recommended)

A unified hook that detects multiple commands. Only commands with provided callbacks are activated.

```tsx
import { useStreetFighter } from "use-street-fighter";

function App() {
  useStreetFighter({
    onHadouken: () => console.log("Hadouken!"),
    onShoryuken: () => console.log("Shoryuken!"),
    onTatsumaki: () => console.log("Tatsumaki!"),
  });

  return <div>Press commands!</div>;
}
```

Enable only specific commands:

```tsx
// Only Hadouken is detected
useStreetFighter({
  onHadouken: () => console.log("Hadouken!"),
});
```

### Individual Hooks

You can also use individual hooks for each command:

```tsx
import { useHadoken, useShoryuken, useTatsumaki } from "use-street-fighter";

function App() {
  useHadoken({
    onCommand: () => console.log("Hadouken!"),
  });

  useShoryuken({
    onCommand: () => console.log("Shoryuken!"),
  });

  useTatsumaki({
    onCommand: () => console.log("Tatsumaki!"),
  });

  return <div>Press commands!</div>;
}
```

## Controls

### Directional Input
- Arrow keys: `↑` `↓` `←` `→`
- WASD: `W` `A` `S` `D`

### Buttons
- Punch: `P`
- Kick: `K`

## Options

### useStreetFighter

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `onHadouken` | `() => void` | - | Callback for Hadouken (↓↘→+P) |
| `onShoryuken` | `() => void` | - | Callback for Shoryuken (→↓↘+P) |
| `onTatsumaki` | `() => void` | - | Callback for Tatsumaki (↓↙←+K) |
| `side` | `"1P"` \| `"2P"` | `"1P"` | Player side (affects forward direction) |
| `inputWindow` | `number` | `500` | Time window in ms to complete command |

### Individual Hooks

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `onCommand` | `() => void` | required | Callback when command is detected |
| `side` | `"1P"` \| `"2P"` | `"1P"` | Player side (affects forward direction) |
| `inputWindow` | `number` | `500` | Time window in ms to complete command |

### Side Configuration

- **1P**: Right is forward (commands entered as shown above)
- **2P**: Left is forward (commands are mirrored)

```tsx
// 2P side - command becomes ↓↙←+P
useHadoken({
  side: "2P",
  onCommand: () => console.log("Hadouken!"),
});
```

### Custom Input Window

```tsx
// Stricter timing (300ms)
useHadoken({
  onCommand: handleHadouken,
  inputWindow: 300,
});
```

## License

MIT
