import * as fs from "fs";

function readInputFile(file: string): string {
  return fs.readFileSync(file, "utf-8").trim();
}

// ------------Helpers------------
function lookAndSay(input: string): string {
  let result = "";
  let i = 0;

  while (i < input.length) {
    let count = 1;

    while (i + 1 < input.length && input[i] === input[i + 1]) {
      count++;
      i++;
    }

    result += count.toString() + input[i];
    i++;
  }

  return result;
}

// ------------P1-----------------
function p1(file: string, iterations: number): number {
  let input = readInputFile(file);

  for (let i = 0; i < iterations; i++) {
    input = lookAndSay(input);
  }

  return input.length;
}

console.log(`P1: ${p1("./src/aoc/2015/day-10/input.txt", 40)}`);

// ------------P2-----------------
function p2(file: string, iterations: number): number {
  let input = readInputFile(file);

  for (let i = 0; i < iterations; i++) {
    input = lookAndSay(input);
  }

  return input.length;
}

console.log(`P2: ${p2("./src/aoc/2015/day-10/input.txt", 50)}`);
