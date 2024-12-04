import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function parseReindeerData(lines: string[]): [number, number, number][] {
  return lines.map((line) => {
    const match = line.match(
      /(\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds/
    );
    if (!match) throw new Error(`Invalid input format for line: ${line}`);
    const [, speed, flyTime, restTime] = match.map(Number);
    return [speed, flyTime, restTime];
  });
}

function calculateWinningDistance(
  reindeerData: [number, number, number][],
  raceDuration: number
): number {
  let maxDistance = 0;

  for (const [speed, flyTime, restTime] of reindeerData) {
    const cycleTime = flyTime + restTime;

    const fullCycles = Math.floor(raceDuration / cycleTime);
    const remainingTime = raceDuration % cycleTime;

    const distance =
      fullCycles * flyTime * speed + Math.min(remainingTime, flyTime) * speed;

    maxDistance = Math.max(maxDistance, distance);
  }

  return maxDistance;
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);

  const reindeerData = parseReindeerData(lines);
  const raceDuration = 2503;

  return calculateWinningDistance(reindeerData, raceDuration);
}

console.log(`P1: ${p1("./src/2015/day-14/input.txt")}`);
