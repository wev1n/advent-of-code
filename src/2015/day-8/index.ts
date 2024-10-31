import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function getInMemoryLength(input: string): number {
  let decodedString = input.slice(1, -1);

  let inMemoryLength = 0;
  let i = 0;

  while (i < decodedString.length) {
    if (decodedString[i] === "\\") {
      if (decodedString[i + 1] === "\\" || decodedString[i + 1] === '"') {
        inMemoryLength += 1;
        i += 2;
      } else if (
        decodedString[i + 1] === "x" &&
        /^[0-9a-fA-F]{2}$/.test(decodedString.slice(i + 2, i + 4))
      ) {
        inMemoryLength += 1;
        i += 4;
      }
    } else {
      inMemoryLength += 1;
      i += 1;
    }
  }

  return inMemoryLength;
}

function getEncodedLength(input: string): number {
  let encodedLength = 2;

  for (const char of input) {
    if (char === "\\" || char === '"') {
      encodedLength += 2;
    } else {
      encodedLength += 1;
    }
  }

  return encodedLength;
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);

  let codeChars = 0;
  let memoryChars = 0;

  for (const line of lines) {
    codeChars += line.length;
    memoryChars += getInMemoryLength(line);
  }

  return codeChars - memoryChars;
}

console.log(`P1: ${p1("./src/2015/day-8/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);

  let originalCodeChars = 0;
  let encodedChars = 0;

  for (const line of lines) {
    originalCodeChars += line.length;
    encodedChars += getEncodedLength(line);
  }

  return encodedChars - originalCodeChars;
}

console.log(`P2: ${p2("./src/2015/day-8/input.txt")}`);
