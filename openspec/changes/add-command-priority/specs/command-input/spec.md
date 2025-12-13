## MODIFIED Requirements

### Requirement: Unified Command Hook
The system SHALL provide a `useStreetFightingCommand` hook that enables detection of multiple commands through a single hook call, activating only the commands for which callbacks are provided. When multiple commands match the same input, only the highest priority command SHALL fire.

#### Scenario: Single command activation
- **WHEN** useStreetFightingCommand is called with only onHadouken callback
- **AND** user enters the Hadouken command
- **THEN** the onHadouken callback is invoked
- **AND** other commands (Shoryuken, Tatsumaki) are not detected

#### Scenario: Multiple command activation
- **WHEN** useStreetFightingCommand is called with onHadouken and onShoryuken callbacks
- **AND** user enters the Shoryuken command
- **THEN** the onShoryuken callback is invoked

#### Scenario: All commands activation
- **WHEN** useStreetFightingCommand is called with all command callbacks (onHadouken, onShoryuken, onTatsumaki)
- **AND** user enters any of the three commands
- **THEN** the corresponding callback is invoked

#### Scenario: Side configuration applies to all commands
- **WHEN** useStreetFightingCommand is called with side="2P"
- **THEN** all active commands use the 2P directional mapping

#### Scenario: Shared input window
- **WHEN** useStreetFightingCommand is called with inputWindow=300
- **THEN** all active commands use the 300ms input window

#### Scenario: Priority-based exclusive firing for overlapping commands
- **WHEN** useStreetFightingCommand is called with onShinkuHadouken and onHadouken callbacks
- **AND** user enters Shinku Hadouken command (236236P)
- **THEN** only onShinkuHadouken callback is invoked
- **AND** onHadouken callback is NOT invoked

#### Scenario: Lower priority command fires when higher priority not registered
- **WHEN** useStreetFightingCommand is called with only onHadouken callback (no onShinkuHadouken)
- **AND** user enters input sequence 236236P
- **THEN** onHadouken callback is invoked twice (once for each 236P portion)

#### Scenario: Fixed priority order
- **WHEN** useStreetFightingCommand is called with multiple command callbacks
- **THEN** commands are checked in the following priority order (highest to lowest):
  1. Shun Goku Satsu
  2. Shinku Hadouken
  3. Sonic Boom
  4. Spinning Bird Kick
  5. Shoryuken
  6. Tatsumaki
  7. Hadouken
