import * as fs from "fs";
import * as nodeCrypto from "crypto";

function readInputFile(file: string): string {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "");
}

// ------------Helpers-----------------

function findLowestNumber(key: string, leadingZeros: number): number {
  let number = 0;
  let hash = "";
  const targetPrefix = "0".repeat(leadingZeros);

  while (true) {
    const input = key + number;
    hash = nodeCrypto.createHash("md5").update(input).digest("hex");

    if (hash.startsWith(targetPrefix)) {
      return number;
    }
    number++;
  }
}

// ------------P1-----------------
function p1(file: string): number {
  const key = readInputFile(file);
  return findLowestNumber(key, 5);
}

console.log(`P1: ${p1("./src/2015/day-4/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const key = readInputFile(file);
  return findLowestNumber(key, 6);
}

console.log(`P2: ${p2("./src/2015/day-4/input.txt")}`);
