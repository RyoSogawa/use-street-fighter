## ADDED Requirements

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
