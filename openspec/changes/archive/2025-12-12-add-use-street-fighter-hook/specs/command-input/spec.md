## ADDED Requirements

### Requirement: Unified Command Hook
The system SHALL provide a `useStreetFighter` hook that enables detection of multiple commands through a single hook call, activating only the commands for which callbacks are provided.

#### Scenario: Single command activation
- **WHEN** useStreetFighter is called with only onHadouken callback
- **AND** user enters the Hadouken command
- **THEN** the onHadouken callback is invoked
- **AND** other commands (Shoryuken, Tatsumaki) are not detected

#### Scenario: Multiple command activation
- **WHEN** useStreetFighter is called with onHadouken and onShoryuken callbacks
- **AND** user enters the Shoryuken command
- **THEN** the onShoryuken callback is invoked

#### Scenario: All commands activation
- **WHEN** useStreetFighter is called with all command callbacks (onHadouken, onShoryuken, onTatsumaki)
- **AND** user enters any of the three commands
- **THEN** the corresponding callback is invoked

#### Scenario: Side configuration applies to all commands
- **WHEN** useStreetFighter is called with side="2P"
- **THEN** all active commands use the 2P directional mapping

#### Scenario: Shared input window
- **WHEN** useStreetFighter is called with inputWindow=300
- **THEN** all active commands use the 300ms input window
