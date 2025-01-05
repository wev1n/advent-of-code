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

function getNextState(grid: string[][]): string[][] {
  const newGrid = grid.map((row) => [...row]);

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      const onNeighbors = countOnNeighbors(grid, x, y);

      if (grid[x][y] === "#") {
        newGrid[x][y] = onNeighbors === 2 || onNeighbors === 3 ? "#" : ".";
      } else {
        newGrid[x][y] = onNeighbors === 3 ? "#" : ".";
      }
    }
  }

  return newGrid;
}

function countOnLights(grid: string[][]): number {
  return grid.flat().filter((cell) => cell === "#").length;
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
