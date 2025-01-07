import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
type Circuit = { [key: string]: string };
type Cache = { [key: string]: number };

function evaluate(wire: string, circuit: Circuit, cache: Cache): number {
  if (!isNaN(parseInt(wire))) return parseInt(wire);
  if (cache[wire] !== undefined) return cache[wire];

  const instruction = circuit[wire];
  const parts = instruction.split(" ");

  let signal: number;

  if (parts.length === 1) {
    signal = evaluate(parts[0], circuit, cache);
  } else if (parts.length === 2) {
    const operand = evaluate(parts[1], circuit, cache);
    signal = ~operand & 0xffff;
  } else if (parts.length === 3) {
    const [left, op, right] = parts;

    if (op === "AND") {
      signal = evaluate(left, circuit, cache) & evaluate(right, circuit, cache);
    } else if (op === "OR") {
      signal = evaluate(left, circuit, cache) | evaluate(right, circuit, cache);
    } else if (op === "LSHIFT") {
      signal = evaluate(left, circuit, cache) << parseInt(right);
    } else if (op === "RSHIFT") {
      signal = evaluate(left, circuit, cache) >>> parseInt(right);
    }
  } else {
    throw new Error("Unknown instruction format");
  }

  cache[wire] = signal;
  return signal;
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);

  const circuit: Circuit = {};
  for (const line of lines) {
    const [instruction, result] = line.split(" -> ");
    circuit[result] = instruction;
  }

  const cache: Cache = {};
  const signalA = evaluate("a", circuit, cache);

  return signalA;
}

console.log(`P1: ${p1("./src/aoc/2015/day-7/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);

  const circuit: Circuit = {};
  for (const line of lines) {
    const [instruction, result] = line.split(" -> ");
    circuit[result] = instruction;
  }

  const cachePart1: Cache = {};
  const signalA = evaluate("a", circuit, cachePart1);

  circuit["b"] = signalA.toString();

  const cachePart2: Cache = {};
  const newSignalA = evaluate("a", circuit, cachePart2);

  return newSignalA;
}

console.log(`P2: ${p2("./src/aoc/2015/day-7/input.txt")}`);
