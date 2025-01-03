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

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  const containers = lines.map(Number);
  const targetVolume = 150;

  return findCombinations(containers, targetVolume);
}

console.log(`P1: ${p1("./src/2015/day-17/input.txt")}`);
