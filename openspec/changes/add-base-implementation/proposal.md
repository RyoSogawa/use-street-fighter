# Change: Add Base Implementation

## Why
The project needs initial setup with tooling (pnpm, Volta, TypeScript, React) and a working `useHadoken` hook as proof of concept. This establishes the foundation for future command input hooks.

## What Changes
- Initialize pnpm project with Volta-pinned Node and pnpm versions
- Set up TypeScript and React as dependencies
- Implement `useHadoken` hook for detecting Hadouken command input (↓↘→+P)
- Support 1P/2P side selection (affects forward direction)
- Create Vite-based demo app for manual testing

## Impact
- Affected specs: `command-input` (new)
- Affected code: New project structure, `src/` directory, `demo/` directory
