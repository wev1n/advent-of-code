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

console.log(`P1: ${p1("./src/aoc/2015/day-3/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const directions = readInputFile(file);

  let santaX = 0,
    santaY = 0;
  let robotX = 0,
    robotY = 0;

  const visited = new Set<String>();

  visited.add(`${santaX},${santaY}`);
  visited.add(`${robotX},${robotY}`);

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];

    if (i % 2 === 0) {
      if (direction === "^") {
        santaY += 1;
      } else if (direction === "v") {
        santaY -= 1;
      } else if (direction === ">") {
        santaX += 1;
      } else if (direction === "<") {
        santaX -= 1;
      }
      visited.add(`${santaX},${santaY}`);
    } else {
      if (direction === "^") {
        robotY += 1;
      } else if (direction === "v") {
        robotY -= 1;
      } else if (direction === ">") {
        robotX += 1;
      } else if (direction === "<") {
        robotX -= 1;
      }
      visited.add(`${robotX},${robotY}`);
    }
  }

  return visited.size;
}

console.log(`P2: ${p2("./src/aoc/2015/day-3/input.txt")}`);
