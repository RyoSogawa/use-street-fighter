# command-input Specification

## Purpose
TBD - created by archiving change add-base-implementation. Update Purpose after archive.
## Requirements
### Requirement: Hadouken Command Detection
The system SHALL detect Hadouken command input (↓↘→+P) and invoke a callback when the command is successfully entered within the input window.

#### Scenario: 1P side Hadouken detection
- **WHEN** user is on 1P side (default)
- **AND** user presses Down, then Down-Right, then Right, then Punch within the input window
- **THEN** the onCommand callback is invoked

#### Scenario: 2P side Hadouken detection
- **WHEN** user is on 2P side
- **AND** user presses Down, then Down-Left, then Left, then Punch within the input window
- **THEN** the onCommand callback is invoked

#### Scenario: Input timeout
- **WHEN** user starts the command sequence
- **AND** does not complete it within the input window (default 500ms)
- **THEN** the partial input is discarded and no callback is invoked

### Requirement: Side Selection
The system SHALL support 1P and 2P side selection via hook parameter, affecting which physical direction corresponds to "forward".

#### Scenario: Default side is 1P
- **WHEN** useHadoken is called without side parameter
- **THEN** the hook uses 1P side (right = forward)

#### Scenario: Explicit 2P side
- **WHEN** useHadoken is called with side="2P"
- **THEN** the hook uses 2P side (left = forward)

### Requirement: Keyboard Input Handling
The system SHALL listen to keyboard events and track directional and button inputs for command detection.

#### Scenario: Arrow key direction input
- **WHEN** user presses ArrowDown key
- **THEN** the system registers Down direction input

#### Scenario: Diagonal detection via simultaneous keys
- **WHEN** user holds ArrowDown and ArrowRight simultaneously
- **THEN** the system registers Down-Right diagonal input

#### Scenario: Punch button input
- **WHEN** user presses P key
- **THEN** the system registers Punch button input

### Requirement: Shoryuken Command Detection
The system SHALL detect Shoryuken (Dragon Punch) command input (→↓↘+P / 623P) and invoke a callback when the command is successfully entered within the input window.

#### Scenario: 1P side Shoryuken detection
- **WHEN** user is on 1P side (default)
- **AND** user presses Right, then Down, then Down-Right, then Punch within the input window
- **THEN** the onCommand callback is invoked

#### Scenario: 2P side Shoryuken detection
- **WHEN** user is on 2P side
- **AND** user presses Left, then Down, then Down-Left, then Punch within the input window
- **THEN** the onCommand callback is invoked

### Requirement: Tatsumaki Command Detection
The system SHALL detect Tatsumaki Senpukyaku (Hurricane Kick) command input (↓↙←+K / 214K) and invoke a callback when the command is successfully entered within the input window.

#### Scenario: 1P side Tatsumaki detection
- **WHEN** user is on 1P side (default)
- **AND** user presses Down, then Down-Left, then Left, then Kick within the input window
- **THEN** the onCommand callback is invoked

#### Scenario: 2P side Tatsumaki detection
- **WHEN** user is on 2P side
- **AND** user presses Down, then Down-Right, then Right, then Kick within the input window
- **THEN** the onCommand callback is invoked

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

### Requirement: Sonic Boom Command Detection
The system SHALL detect Sonic Boom charge command input (←charge→+P / [4]6P) and invoke a callback when the command is successfully entered.

#### Scenario: 1P side Sonic Boom detection
- **WHEN** user is on 1P side (default)
- **AND** user holds Left direction for the charge time (default 800ms)
- **AND** user releases and presses Right + Punch
- **THEN** the onCommand callback is invoked

#### Scenario: 2P side Sonic Boom detection
- **WHEN** user is on 2P side
- **AND** user holds Right direction for the charge time
- **AND** user releases and presses Left + Punch
- **THEN** the onCommand callback is invoked

#### Scenario: Insufficient charge time
- **WHEN** user holds the charge direction for less than the required charge time
- **AND** user releases and presses the opposite direction + button
- **THEN** no callback is invoked

### Requirement: Spinning Bird Kick Command Detection
The system SHALL detect Spinning Bird Kick charge command input (↓charge↑+K / [2]8K) and invoke a callback when the command is successfully entered.

#### Scenario: 1P side Spinning Bird Kick detection
- **WHEN** user is on 1P side (default)
- **AND** user holds Down direction for the charge time (default 800ms)
- **AND** user releases and presses Up + Kick
- **THEN** the onCommand callback is invoked

#### Scenario: 2P side Spinning Bird Kick detection
- **WHEN** user is on 2P side
- **AND** user holds Down direction for the charge time
- **AND** user releases and presses Up + Kick
- **THEN** the onCommand callback is invoked

#### Scenario: Custom charge time
- **WHEN** useSonicBoom or useSpinningBirdKick is called with chargeTime=500
- **THEN** the command requires only 500ms of charge time

### Requirement: Shun Goku Satsu Command Detection
The system SHALL detect Shun Goku Satsu (Raging Demon) button sequence command (P P → K P) and invoke a callback when the command is successfully entered within the input window.

#### Scenario: Successful Shun Goku Satsu detection
- **WHEN** user presses Punch, then Punch, then Right, then Kick, then Punch within the input window
- **THEN** the onCommand callback is invoked

#### Scenario: 2P side Shun Goku Satsu detection
- **WHEN** user is on 2P side
- **AND** user presses Punch, then Punch, then Left, then Kick, then Punch within the input window
- **THEN** the onCommand callback is invoked

#### Scenario: Incomplete sequence
- **WHEN** user does not complete the full button sequence within the input window
- **THEN** no callback is invoked and partial input is discarded

