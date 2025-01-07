import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function parseHappinessData(lines: string[]): Map<string, Map<string, number>> {
  const happinessMap = new Map<string, Map<string, number>>();

  for (const line of lines) {
    const parts = line.split(" ");
    const person1 = parts[0];
    const person2 = parts[10].slice(0, -1);
    const gainOrLose = parts[2] === "gain" ? 1 : -1;
    const units = parseInt(parts[3]);

    if (!happinessMap.has(person1)) {
      happinessMap.set(person1, new Map<string, number>());
    }

    happinessMap.get(person1)?.set(person2, gainOrLose * units);
  }

  return happinessMap;
}

function calculateTotalHappiness(
  arrangement: string[],
  happinessMap: Map<string, Map<string, number>>
): number {
  let totalHappiness = 0;

  for (let i = 0; i < arrangement.length; i++) {
    const person1 = arrangement[i];
    const person2 = arrangement[(i + 1) % arrangement.length];

    totalHappiness += happinessMap.get(person1)?.get(person2) ?? 0;
    totalHappiness += happinessMap.get(person2)?.get(person1) ?? 0;
  }

  return totalHappiness;
}

function permute<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];
  const result: T[][] = [];

  arr.forEach((item, index) => {
    const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];
    const perms = permute(remaining);
    perms.forEach((perm) => result.push([item, ...perm]));
  });

  return result;
}

function findOptimalArrangement(
  happinessMap: Map<string, Map<string, number>>
) {
  const people = Array.from(happinessMap.keys());
  const arrangements = permute(people);

  let maxHappiness = -Infinity;

  for (const arrangement of arrangements) {
    const happiness = calculateTotalHappiness(arrangement, happinessMap);

    if (happiness > maxHappiness) {
      maxHappiness = happiness;
    }
  }

  return maxHappiness;
}

function addYourself(happinessMap: Map<string, Map<string, number>>) {
  const people = Array.from(happinessMap.keys());
  happinessMap.set("Yourself", new Map());

  for (const person of people) {
    happinessMap.get(person)?.set("Yourself", 0);
    happinessMap.get("Yourself")?.set(person, 0);
  }
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  const happinessMap = parseHappinessData(lines);
  return findOptimalArrangement(happinessMap);
}

console.log(`P1: ${p1("./src/aoc/2015/day-13/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);
  const happinessMap = parseHappinessData(lines);
  addYourself(happinessMap);

  return findOptimalArrangement(happinessMap);
}

console.log(`P2: ${p2("./src/aoc/2015/day-13/input.txt")}`);
