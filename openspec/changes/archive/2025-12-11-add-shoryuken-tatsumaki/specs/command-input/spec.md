## ADDED Requirements

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
