import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function helperFunction(input: string): string {
  return input;
}

// ------------P1-----------------
function p1(file: string): string[] {
  const lines = readInputFile(file);

  console.log(lines);
  return lines;
}

console.log(`P1: ${p1("./src/aoc/2015/day-1/input.txt")}`);
