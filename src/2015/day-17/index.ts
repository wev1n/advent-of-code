import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function findCombinations(
  containers: number[],
  target: number,
  index: number = 0,
  currentSum: number = 0
): number {
  if (currentSum === target) {
    return 1;
  }

  if (currentSum > target || index >= containers.length) {
    return 0;
  }

  const include = findCombinations(
    containers,
    target,
    index + 1,
    currentSum + containers[index]
  );

  const exclude = findCombinations(containers, target, index + 1, currentSum);

  return include + exclude;
}

function findAllCombinations(
  containers: number[],
  target: number,
  index: number = 0,
  currentSum: number = 0,
  currentCount: number = 0
): { count: number }[] {
  if (currentSum === target) {
    return [{ count: currentCount }];
  }

  if (currentSum > target || index >= containers.length) {
    return [];
  }

  const include = findAllCombinations(
    containers,
    target,
    index + 1,
    currentSum + containers[index],
    currentCount + 1
  );

  const exclude = findAllCombinations(
    containers,
    target,
    index + 1,
    currentSum,
    currentCount
  );

  return [...include, ...exclude];
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  const containers = lines.map(Number);
  const targetVolume = 150;

  return findCombinations(containers, targetVolume);
}

console.log(`P1: ${p1("./src/2015/day-17/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);
  const containers = lines.map(Number);
  const targetVolume = 150;

  const validCombinations = findAllCombinations(containers, targetVolume);
  const minCount = Math.min(...validCombinations.map((c) => c.count));
  const minCountCombinations = validCombinations.filter(
    (c) => c.count === minCount
  ).length;

  return minCountCombinations;
}

console.log(`P2: ${p2("./src/2015/day-17/input.txt")}`);
