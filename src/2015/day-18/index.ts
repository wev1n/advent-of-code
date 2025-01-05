import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function countOnNeighbors(grid: string[][], x: number, y: number): number {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
      if (grid[nx][ny] === "#") {
        count++;
      }
    }
  }

  return count;
}

function getNextState(
  grid: string[][],
  stuckCorners: boolean = false
): string[][] {
  const newGrid = grid.map((row) => [...row]);

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (stuckCorners && isCorner(x, y, grid.length, grid[0].length)) {
        continue;
      }

      const onNeighbors = countOnNeighbors(grid, x, y);

      if (grid[x][y] === "#") {
        newGrid[x][y] = onNeighbors === 2 || onNeighbors === 3 ? "#" : ".";
      } else {
        newGrid[x][y] = onNeighbors === 3 ? "#" : ".";
      }
    }
  }

  if (stuckCorners) {
    turnOnCorners(newGrid);
  }

  return newGrid;
}

function countOnLights(grid: string[][]): number {
  return grid.flat().filter((cell) => cell === "#").length;
}

function isCorner(x: number, y: number, rows: number, cols: number): boolean {
  return (
    (x === 0 && y === 0) ||
    (x === 0 && y === cols - 1) ||
    (x === rows - 1 && y === 0) ||
    (x === rows - 1 && y === cols - 1)
  );
}

function turnOnCorners(grid: string[][]): void {
  const rows = grid.length;
  const cols = grid[0].length;
  grid[0][0] = "#";
  grid[0][cols - 1] = "#";
  grid[rows - 1][0] = "#";
  grid[rows - 1][cols - 1] = "#";
}

// ------------P1-----------------
function p1(file: string): number {
  let grid = readInputFile(file).map((line) => line.split(""));

  for (let step = 0; step < 100; step++) {
    grid = getNextState(grid);
  }

  return countOnLights(grid);
}

console.log(`P1: ${p1("./src/2015/day-18/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  let grid = readInputFile(file).map((line) => line.split(""));

  turnOnCorners(grid);

  for (let step = 0; step < 100; step++) {
    grid = getNextState(grid, true);
  }

  return countOnLights(grid);
}

console.log(`P2: ${p2("./src/2015/day-18/input.txt")}`);
