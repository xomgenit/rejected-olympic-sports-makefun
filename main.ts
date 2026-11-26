// Rejected Olympic Sports — one-line entry writer.
// The Games turned this event down; the broadcast booth never recovered.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const eventName = "The 4×100m relay of office chairs";
const lineUp = "four athletes, one squeaky wheel";
const batonRule = "a baton that is just a stapler";

function composeEntry(): string {
  return `${eventName}: ${lineUp}, and ${batonRule}.`;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), composeEntry(), "utf8");

// Gate self-check: the sealed scorer only accepts 1–200 UTF-8 characters,
// so fail loudly here instead of shipping an entry the judge never sees.
const GATE_MIN = 1;
const GATE_MAX = 200;
const entryLength = [...composeEntry()].length;
if (entryLength < GATE_MIN || entryLength > GATE_MAX) {
  throw new Error(`entry length ${entryLength} is outside the ${GATE_MIN}–${GATE_MAX} gate`);
}
console.log(`entry written: ${entryLength} characters (gate ${GATE_MIN}–${GATE_MAX})`);
