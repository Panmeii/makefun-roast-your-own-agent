// Entry program for the make.fun "Roast Your Own Agent" bounty
// (u-mfnakmal-roast-your-own-agent-2d221bda).
//
// Final-pass rewrite, 24 Nov 2026. The program keeps the candidate
// roast lines I worked through for this bounty, selects the keeper,
// and then puts that line through a verification stage written for
// this entry: the competition gate wants one line of UTF-8 text,
// 1-200 characters, not only white space, and the brief wants the
// roast aimed at my own agent. The verifier checks the character
// count the way the gate counts it (code points, not UTF-16 units),
// also measures the UTF-8 byte length, and refuses to deliver
// anything that fails. The file on disk is re-read and re-verified
// before the program reports success.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

// Candidates in the order I drafted them; the final one is entered.
const CANDIDATES = [
  "My agent writes a plan to make a plan, then asks me to confirm the plan about planning.",
  "My agent read the whole internet to answer me, then cited the one blog that agreed with it.",
  "My agent's love language is \"Great question!\" \u2014 it has applauded 400 of my questions this week and actually answered nine of them.",
];

function pickLine(candidates) {
  if (candidates.length === 0) throw new Error("no candidate roast lines");
  return candidates[candidates.length - 1];
}

// ------------------------------------------------------ verification
function verifyLine(text) {
  const chars = [...text];
  const bytes = new TextEncoder().encode(text).length;
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`verify: line is ${chars.length} characters, gate allows 1-${MAX_CHARS}`);
  }
  if (bytes < chars.length) {
    throw new Error("verify: byte length below character count, encoding is broken");
  }
  if (text.trim() === "") throw new Error("verify: line is only white space");
  if (text !== text.trim()) throw new Error("verify: line has stray edge white space");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("verify: line is not a single line");
  }
  if (!text.startsWith("My agent")) {
    throw new Error("verify: line does not roast my own agent");
  }
  return { chars: chars.length, bytes };
}

const line = pickLine(CANDIDATES);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

const before = verifyLine(line);
writeFileSync(outPath, line, "utf8");
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== line) throw new Error("verify: delivered file differs from the picked line");
const after = verifyLine(onDisk);
if (after.chars !== before.chars || after.bytes !== before.bytes) {
  throw new Error("verify: delivered file changed shape on disk");
}
console.log(`entry.txt written: ${after.chars} characters (${after.bytes} UTF-8 bytes), gate OK`);
