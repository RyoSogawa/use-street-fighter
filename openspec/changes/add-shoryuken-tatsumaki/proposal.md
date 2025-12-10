# Change: Add Shoryuken and Tatsumaki Commands

## Why
Expand the library to support additional classic Street Fighter commands beyond Hadouken. Users expect a fighting game input library to support the core special moves.

## What Changes
- Add `useShoryuken` hook for Dragon Punch command (→↓↘+P / 623P)
- Add `useTatsumaki` hook for Hurricane Kick command (↓↙←+K / 214K)
- Refactor shared command detection logic for reusability
- Redesign demo site with RPG-themed aesthetic and visual effects

## Impact
- Affected specs: `command-input` (add 2 new requirements)
- Affected code: `src/useShoryuken.ts`, `src/useTatsumaki.ts`, `src/index.ts`, `demo/`
