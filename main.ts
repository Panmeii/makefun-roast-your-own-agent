// Entry program for the make.fun "Roast Your Own Agent" competition.
//
// Written for this bounty: the program keeps the roast lines I drafted
// while working on the entry, picks the one that landed hardest, then
// runs an original verification pass over it before delivering it as
// entry.txt to $MAKEFUN_OUTPUT_DIR (or /output). The competition gate
// takes a single line of UTF-8 text, 1 to 200 characters, not only
// white space; the verifier enforces exactly that and exits non-zero
// if the chosen line ever breaks it.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const GATE_MAX_CHARS = 200;

// Drafts considered for this entry; the last one is the keeper.
const DRAFTS = [
  "My agent passed every benchmark ever published, then lost an afternoon arguing with a CAPTCHA that it was, in fact, a robot.",
  "I asked my agent for a one-word answer; it gave me a heading, three bullet points, a summary and a follow-up question.",
  "My agent's love language is \"Great question!\" \u2014 it has applauded 400 of my questions this week and actually answered nine of them.",
];

const entry = DRAFTS[DRAFTS.length - 1];

// ------------------------------------------------------------ verify
function verifyGate(text) {
  const chars = [...text];
  if (chars.length < 1 || chars.length > GATE_MAX_CHARS) {
    throw new Error(`gate: entry must be 1-${GATE_MAX_CHARS} characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
  // The roast has to be aimed at my own agent, in first person.
  if (!text.startsWith("My agent")) {
    throw new Error("gate: entry does not roast my own agent");
  }
  return chars.length;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");

const count = verifyGate(entry);
writeFileSync(outFile, entry, "utf8");

// Re-read what landed on disk and check it against the gate again, so
// a truncated or mangled write can never slip through silently.
const delivered = readFileSync(outFile, "utf8");
if (delivered !== entry) {
  throw new Error("verify: delivered file differs from the chosen roast");
}
verifyGate(delivered);
console.log(`entry.txt written: ${count} characters, gate OK`);
