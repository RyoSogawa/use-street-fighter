# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-13

### Added

- Motion command hooks for classic Street Fighter moves:
  - `useHadouken` - Quarter circle forward + Punch (236P)
  - `useShoryuken` - Forward, down, down-forward + Punch (623P)
  - `useTatsumaki` - Quarter circle back + Kick (214K)
- Charge command hooks:
  - `useSonicBoom` - Charge back, forward + Punch ([4]6P)
  - `useSpinningBirdKick` - Charge down, up + Kick ([2]8K)
- Super command hook:
  - `useShinkuHadouken` - Double quarter circle forward + Punch (236236P)
- Button sequence command hook:
  - `useShunGokuSatsu` - Light Punch, Light Punch, Forward, Light Kick, Heavy Punch (PP→KP)
- Unified command detection hook:
  - `useStreetFightingCommand` - Detects all commands with configurable priority-based matching
- 1P/2P side support - All commands adapt to player position (left/right side)
- Configurable input windows:
  - Motion command input window (default: 200ms)
  - Charge command hold time (default: 1000ms)
  - Button sequence input window (default: 1000ms)
- Full TypeScript support with comprehensive type definitions

[0.1.0]: https://github.com/RyoSogawa/use-street-fighting-command/releases/tag/v0.1.0
