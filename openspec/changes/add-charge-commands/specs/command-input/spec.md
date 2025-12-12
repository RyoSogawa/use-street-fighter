## ADDED Requirements

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
