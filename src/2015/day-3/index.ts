import * as fs from "fs";

function readInputFile(file: string): string {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "");
}

// ------------P1-----------------
function p1(file: string): number {
  const directions = readInputFile(file);

  let x = 0;
  let y = 0;

  const visited = new Set<String>();

  visited.add(`${x},${y}`);

  for (let direction of directions) {
    if (direction === "^") {
      y += 1;
    } else if (direction === "v") {
      y -= 1;
    } else if (direction === ">") {
      x += 1;
    } else if (direction === "<") {
      x -= 1;
    }

    visited.add(`${x},${y}`);
  }

  return visited.size;
}

console.log(`P1: ${p1("./src/2015/day-3/input.txt")}`);
