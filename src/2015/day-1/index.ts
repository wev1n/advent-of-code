import * as fs from "fs";

// ------------P1-----------------
function p1(file: string): string[] {
  const input = fs
    .readFileSync(file, "utf-8")
    .trim()
    .replace(/\r/g, "")
    .split("\n");

  return input;
}

console.log(`P1: ${p1("./example.txt")}`);

// ------------P2-----------------
function p2(file: string): string[] {
  const input = fs
    .readFileSync(file, "utf-8")
    .trim()
    .replace(/\r/g, "")
    .split("\n");

  return input;
}

console.log(`P2: ${p2("./example.txt")}`);
