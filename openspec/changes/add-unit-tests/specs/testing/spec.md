## ADDED Requirements

### Requirement: Test Infrastructure
The project SHALL have a test framework configured to run unit tests for React hooks.

#### Scenario: Test command available
- **WHEN** developer runs `pnpm test`
- **THEN** vitest executes all test files

#### Scenario: Test files discovered
- **WHEN** vitest runs
- **THEN** all `*.test.ts` files in `src/` are executed

### Requirement: Keyboard Event Simulation
The test utilities SHALL provide helpers to simulate keyboard events for testing command inputs.

#### Scenario: Simulate key press
- **WHEN** test calls simulateKeyDown with a key code
- **THEN** a keydown event is dispatched to the document

#### Scenario: Simulate key release
- **WHEN** test calls simulateKeyUp with a key code
- **THEN** a keyup event is dispatched to the document

### Requirement: Motion Command Test Coverage
The test suite SHALL cover all motion command hooks (useHadoken, useShoryuken, useTatsumaki) with scenarios from the command-input spec.

#### Scenario: Hadouken 1P side test
- **WHEN** test simulates Down, Down-Right, Right, Punch sequence
- **THEN** onCommand callback is invoked

#### Scenario: Hadouken 2P side test
- **WHEN** test simulates Down, Down-Left, Left, Punch sequence with side="2P"
- **THEN** onCommand callback is invoked

#### Scenario: Input timeout test
- **WHEN** test simulates partial sequence and waits beyond input window
- **THEN** onCommand callback is not invoked

### Requirement: Charge Command Test Coverage
The test suite SHALL cover charge command hooks (useSonicBoom, useSpinningBirdKick) with charge time verification.

#### Scenario: Sonic Boom successful charge
- **WHEN** test holds Left for charge time then releases to Right + Punch
- **THEN** onCommand callback is invoked

#### Scenario: Insufficient charge time
- **WHEN** test holds Left for less than charge time
- **THEN** onCommand callback is not invoked

### Requirement: Super Command Test Coverage
The test suite SHALL cover super command hooks (useShinkuHadouken) with double motion verification.

#### Scenario: Shinku Hadouken detection
- **WHEN** test simulates Down, Down-Right, Right, Down, Down-Right, Right, Punch sequence
- **THEN** onCommand callback is invoked

### Requirement: Button Sequence Test Coverage
The test suite SHALL cover button sequence hooks (useShunGokuSatsu) with correct sequence verification.

#### Scenario: Shun Goku Satsu detection
- **WHEN** test simulates Punch, Punch, Right, Kick, Punch sequence
- **THEN** onCommand callback is invoked

### Requirement: Unified Hook Test Coverage
The test suite SHALL cover useStreetFighter hook verifying selective command activation.

#### Scenario: Single command activation
- **WHEN** test provides only onHadouken callback
- **AND** simulates Hadouken command
- **THEN** onHadouken is invoked

#### Scenario: Multiple command activation
- **WHEN** test provides multiple command callbacks
- **AND** simulates different commands
- **THEN** corresponding callbacks are invoked
