## ADDED Requirements

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
