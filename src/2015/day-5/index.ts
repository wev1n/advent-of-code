import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function checkIfNaughtyOrNice(input: string): string {
  const vowelCount = (input.match(/[aeiou]/gi) || []).length;
  const hasDoubleLetter = /(.)\1/.test(input);
  const hasForbiddenLetter = /(ab|cd|pq|xy)/.test(input);

  if (vowelCount >= 3 && hasDoubleLetter && !hasForbiddenLetter) {
    return "nice";
  } else {
    return "naughty";
  }
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  let niceStrings = 0;

  lines.forEach((line) => {
    if (checkIfNaughtyOrNice(line) === "nice") {
      niceStrings++;
    }
  });

  return niceStrings;
}

console.log(`P1: ${p1("./src/2015/day-5/input.txt")}`);
