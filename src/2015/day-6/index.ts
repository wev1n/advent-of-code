import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function createBooleanGrid(): boolean[][] {
  return Array.from({ length: 1000 }, () => Array(1000).fill(false));
}

function createNumberGrid(): number[][] {
  return Array.from({ length: 1000 }, () => Array(1000).fill(0));
}

function parseInstruction(
  instruction: string
): [string, [number, number], [number, number]] {
  const turnOnMatch = instruction.match(
    /turn on (\d+),(\d+) through (\d+),(\d+)/
  );
  const turnOffMatch = instruction.match(
    /turn off (\d+),(\d+) through (\d+),(\d+)/
  );
  const toggleMatch = instruction.match(
    /toggle (\d+),(\d+) through (\d+),(\d+)/
  );

  if (turnOnMatch) {
    return [
      "turn on",
      [Number(turnOnMatch[1]), Number(turnOnMatch[2])],
      [Number(turnOnMatch[3]), Number(turnOnMatch[4])],
    ];
  } else if (turnOffMatch) {
    return [
      "turn off",
      [Number(turnOffMatch[1]), Number(turnOffMatch[2])],
      [Number(turnOffMatch[3]), Number(turnOffMatch[4])],
    ];
  } else if (toggleMatch) {
    return [
      "toggle",
      [Number(toggleMatch[1]), Number(toggleMatch[2])],
      [Number(toggleMatch[3]), Number(toggleMatch[4])],
    ];
  } else {
    throw new Error("Invalid instruction format");
  }
}

function countLitLights(grid: boolean[][]): number {
  let count = 0;
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      if (grid[x][y]) {
        count++;
      }
    }
  }

  return count;
}

function totalBrightness(grid: number[][]): number {
  let total = 0;
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      total += grid[x][y];
    }
  }

  return total;
}

// ------------P1-----------------
function p1(file: string): number {
  const instructions = readInputFile(file);
  const grid = createBooleanGrid();

  instructions.forEach((instruction) => {
    const [action, start, end] = parseInstruction(instruction);
    const [x1, y1]: [number, number] = start;
    const [x2, y2]: [number, number] = end;
    for (let x = Number(x1); x <= Number(x2); x++) {
      for (let y = Number(y1); y <= Number(y2); y++) {
        if (action === "turn on") {
          grid[x][y] = true;
        } else if (action === "turn off") {
          grid[x][y] = false;
        } else if (action === "toggle") {
          grid[x][y] = !grid[x][y];
        }
      }
    }
  });

  return countLitLights(grid);
}

console.log(`P1: ${p1("./src/2015/day-6/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const instructions = readInputFile(file);
  const grid = createNumberGrid();

  instructions.forEach((instruction) => {
    const [action, start, end] = parseInstruction(instruction);
    const [x1, y1]: [number, number] = start;
    const [x2, y2]: [number, number] = end;

    for (let x = Number(x1); x <= Number(x2); x++) {
      for (let y = Number(y1); y <= Number(y2); y++) {
        if (action === "turn on") {
          grid[x][y] += 1;
        } else if (action === "turn off") {
          grid[x][y] = Math.max(0, grid[x][y] - 1);
        } else if (action === "toggle") {
          grid[x][y] += 2;
        }
      }
    }
  });

  return totalBrightness(grid);
}

console.log(`P2: ${p2("./src/2015/day-6/input.txt")}`);
