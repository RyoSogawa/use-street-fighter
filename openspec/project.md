# Project Context

## Purpose
A React custom hook library for detecting Street Fighter-style command inputs. Enables detection of fighting game-style command inputs such as Hadouken (↓↘→+P) and Shoryuken (→↓↘+P) in web applications. To be published as an npm package.

## Tech Stack
- TypeScript
- React 18+
- Build: TBD (considering Vite, Rollup, tsup, etc.)
- Test: TBD (considering Vitest, Jest, etc.)
- Package Manager: Pnpm

## Project Conventions

### Code Style
- Prefer early returns to keep nesting shallow
- Avoid excessive comments (only when logic is complex or intent is unclear)
- Code formatting with Biome

### Architecture Patterns
- Custom hooks use `use-` prefix naming convention
- Follow single responsibility principle; each hook focuses on one feature
- Export type definitions for consumers

### Testing Strategy
- Verify hook behavior with unit tests
- Use `renderHook` from React Testing Library
- Comprehensive test cases for key input sequences

### Git Workflow
- Use main branch as default branch
- Develop on feature/fix/refactor branches
- Keep commit messages concise

## Domain Context

### Command Input Basics
- **Directional Keys**: Represented as ↑↓←→, numpad notation (236=↓↘→) is also common
- **Buttons**: P (Punch), K (Kick), etc., may include strength variants (Light/Medium/Heavy)
- **Command Input**: Combination of directional keys and buttons; input order and timing are critical
- **Input Window**: Allowed time to complete a command (often managed in frames)

### Common Command Examples
- Hadouken: ↓↘→+P (236P)
- Shoryuken: →↓↘+P (623P)
- Tatsumaki Senpukyaku: ↓↙←+K (214K)
- Charge moves: ←(charge)→+P, etc.

## Important Constraints
- Must follow React hooks rules (can only be called at top level)
- Depends on browser keyboard event API
- Mobile touch input is out of initial scope (may be considered later)
- Performance: Input detection must happen in real-time

## External Dependencies
- React (peerDependency)