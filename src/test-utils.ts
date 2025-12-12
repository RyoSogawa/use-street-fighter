import { act } from "@testing-library/react";

export const KEY_CODES = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  w: "KeyW",
  a: "KeyA",
  s: "KeyS",
  d: "KeyD",
  punch: "KeyP",
  kick: "KeyK",
} as const;

export function pressKey(code: string) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { code }));
  });
}

export function releaseKey(code: string) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keyup", { code }));
  });
}

export function pressAndRelease(code: string) {
  pressKey(code);
  releaseKey(code);
}

export function pressKeys(...codes: string[]) {
  for (const code of codes) {
    pressKey(code);
  }
}

export function releaseKeys(...codes: string[]) {
  for (const code of codes) {
    releaseKey(code);
  }
}

export async function wait(ms: number) {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  });
}

export function simulateHadouken1P() {
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.right);
  releaseKeys(KEY_CODES.down, KEY_CODES.right);
  pressAndRelease(KEY_CODES.right);
  pressAndRelease(KEY_CODES.punch);
}

export function simulateHadouken2P() {
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.left);
  releaseKeys(KEY_CODES.down, KEY_CODES.left);
  pressAndRelease(KEY_CODES.left);
  pressAndRelease(KEY_CODES.punch);
}

export function simulateShoryuken1P() {
  pressAndRelease(KEY_CODES.right);
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.right);
  releaseKeys(KEY_CODES.down, KEY_CODES.right);
  pressAndRelease(KEY_CODES.punch);
}

export function simulateShoryuken2P() {
  pressAndRelease(KEY_CODES.left);
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.left);
  releaseKeys(KEY_CODES.down, KEY_CODES.left);
  pressAndRelease(KEY_CODES.punch);
}

export function simulateTatsumaki1P() {
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.left);
  releaseKeys(KEY_CODES.down, KEY_CODES.left);
  pressAndRelease(KEY_CODES.left);
  pressAndRelease(KEY_CODES.kick);
}

export function simulateTatsumaki2P() {
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.right);
  releaseKeys(KEY_CODES.down, KEY_CODES.right);
  pressAndRelease(KEY_CODES.right);
  pressAndRelease(KEY_CODES.kick);
}

export function simulateShinkuHadouken1P() {
  // First 236
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.right);
  releaseKeys(KEY_CODES.down, KEY_CODES.right);
  pressAndRelease(KEY_CODES.right);
  // Second 236
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.right);
  releaseKeys(KEY_CODES.down, KEY_CODES.right);
  pressAndRelease(KEY_CODES.right);
  pressAndRelease(KEY_CODES.punch);
}

export function simulateShinkuHadouken2P() {
  // First 214
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.left);
  releaseKeys(KEY_CODES.down, KEY_CODES.left);
  pressAndRelease(KEY_CODES.left);
  // Second 214
  pressAndRelease(KEY_CODES.down);
  pressKey(KEY_CODES.down);
  pressKey(KEY_CODES.left);
  releaseKeys(KEY_CODES.down, KEY_CODES.left);
  pressAndRelease(KEY_CODES.left);
  pressAndRelease(KEY_CODES.punch);
}

export function simulateShunGokuSatsu1P() {
  pressAndRelease(KEY_CODES.punch);
  pressAndRelease(KEY_CODES.punch);
  pressAndRelease(KEY_CODES.right);
  pressAndRelease(KEY_CODES.kick);
  pressAndRelease(KEY_CODES.punch);
}

export function simulateShunGokuSatsu2P() {
  pressAndRelease(KEY_CODES.punch);
  pressAndRelease(KEY_CODES.punch);
  pressAndRelease(KEY_CODES.left);
  pressAndRelease(KEY_CODES.kick);
  pressAndRelease(KEY_CODES.punch);
}

export async function simulateSonicBoom1P(chargeTime = 850) {
  pressKey(KEY_CODES.left);
  await wait(chargeTime);
  releaseKey(KEY_CODES.left);
  pressKey(KEY_CODES.right);
  pressKey(KEY_CODES.punch);
  releaseKeys(KEY_CODES.right, KEY_CODES.punch);
}

export async function simulateSonicBoom2P(chargeTime = 850) {
  pressKey(KEY_CODES.right);
  await wait(chargeTime);
  releaseKey(KEY_CODES.right);
  pressKey(KEY_CODES.left);
  pressKey(KEY_CODES.punch);
  releaseKeys(KEY_CODES.left, KEY_CODES.punch);
}

export async function simulateSpinningBirdKick(chargeTime = 850) {
  pressKey(KEY_CODES.down);
  await wait(chargeTime);
  releaseKey(KEY_CODES.down);
  pressKey(KEY_CODES.up);
  pressKey(KEY_CODES.kick);
  releaseKeys(KEY_CODES.up, KEY_CODES.kick);
}
