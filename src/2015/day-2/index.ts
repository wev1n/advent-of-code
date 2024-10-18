import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// 2*l*w + 2*w*h + 2*h*l
function calculateWrappingPaper(l: number, w: number, h: number): number {
  const s1 = l * w;
  const s2 = w * h;
  const s3 = h * l;

  const surfaceArea = 2 * s1 + 2 * s2 + 2 * s3;
  const smallestSide = Math.min(s1, s2, s3);

  return surfaceArea + smallestSide;
}

// 2x3x4, 2+2+3+3 = 10 + 2*3*4 = 24
function calculateRibbon(l: number, w: number, h: number): number {
  const perimeters = [2 * (l + w), 2 * (w + h), 2 * (h + l)];

  const ribbonLength = Math.min(...perimeters);
  const ribbonBow = l * w * h;

  return ribbonLength + ribbonBow;
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);

  const result: number[] = lines.map((line) => {
    const dimensions = line.trim().split("x").map(Number);

    if (dimensions.length === 3) {
      const [l, w, h] = dimensions;
      return calculateWrappingPaper(l, w, h);
    } else {
      return 0;
    }
  });

  return result.reduce((acc, curr) => acc + curr, 0);
}

console.log(`P1: ${p1("./src/2015/day-2/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);

  const result: number[] = lines.map((line) => {
    const dimensions = line.trim().split("x").map(Number);

    if (dimensions.length === 3) {
      const [l, w, h] = dimensions;
      return calculateRibbon(l, w, h);
    } else {
      return 0;
    }
  });

  return result.reduce((acc, curr) => acc + curr, 0);
}

console.log(`P2: ${p2("./src/2015/day-2/input.txt")}`);
