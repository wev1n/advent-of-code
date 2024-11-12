import * as fs from "fs";

function readInputFile(file: string): any {
  try {
    const json = fs
      .readFileSync(file, "utf-8")
      .trim()
      .replace(/\r/g, "")
      .split("\n");

    return JSON.parse(json.join(""));
  } catch (error) {
    console.error("Failed to parse JSON file:", error);
  }
}

// ------------P1-----------------
function p1(data: any): number {
  if (data === null || data === undefined) {
    return 0;
  }

  let total = 0;

  if (typeof data === "number") {
    return data;
  }

  if (Array.isArray(data)) {
    for (const item of data) {
      total += p1(item);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        total += p1(data[key]);
      }
    }
  }

  return total;
}

const jsonData = readInputFile("./src/2015/day-12/input.txt");
console.log(`P1: ${p1(jsonData)}`);

// ------------P2-----------------
function p2(data: any): number {
  if (data === null || data === undefined) {
    return 0;
  }

  let total = 0;

  if (typeof data === "number") {
    return data;
  }

  if (Array.isArray(data)) {
    for (const item of data) {
      total += p2(item);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === "red") {
        return 0;
      }
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        total += p2(data[key]);
      }
    }
  }

  return total;
}

console.log(`P2: ${p2(jsonData)}`);
