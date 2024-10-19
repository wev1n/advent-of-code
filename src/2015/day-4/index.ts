import * as fs from "fs";
import * as nodeCrypto from "crypto";

function readInputFile(file: string): string {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "");
}

// ------------Helpers-----------------

function findLowestNumber(key: string): number {
  let number = 0;
  let hash = "";

  while (true) {
    const input = key + number;
    hash = nodeCrypto.createHash("md5").update(input).digest("hex");

    if (hash.startsWith("00000")) {
      return number;
    }
    number++;
  }
}

// ------------P1-----------------
function p1(file: string): number {
  const key = readInputFile(file);
  return findLowestNumber(key);
}

console.log(`P1: ${p1("./src/2015/day-4/input.txt")}`);
