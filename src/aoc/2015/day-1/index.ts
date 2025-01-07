import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  let floor = 0;

  lines.forEach((line) => {
    for (const char of line) {
      if (char === "(") {
        floor += 1;
      } else if (char === ")") {
        floor -= 1;
      }
    }
  });

  return floor;
}

console.log(`P1: ${p1("./src/aoc/2015/day-1/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);

  let floor = 0;
  let position = 0;

  for (const line of lines) {
    for (const char of line) {
      position += 1;

      if (char === "(") {
        floor += 1;
      } else if (char === ")") {
        floor -= 1;
      }

      if (floor < 0) {
        return position;
      }
    }
  }
}

console.log(`P2: ${p2("./src/aoc/2015/day-1/input.txt")}`);
