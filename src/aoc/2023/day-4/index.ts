import * as fs from "fs";

const lines: string[] = fs
  .readFileSync("./src/aoc/2023/day-4/input.txt", "utf-8")
  .trim()
  .replace(/\r/g, "")
  .split("\n");

// ------------P1-----------------
let result: number = 0;

lines.forEach((line) => {
  result += countCardPoints(line);
});

console.log(result);

function countCardPoints(line: string): number {
  const lists: string[] = line.split(":")[1].trim().split("|");

  const winningNumbers: number[] = lists[0].match(/\d+/g)?.map(Number) || [];
  const myNumbers: number[] = lists[1]?.match(/\d+/g)?.map(Number) || [];

  const commonItems: number[] = myNumbers.filter((item) =>
    winningNumbers.includes(item)
  );

  let output: number = 0;
  if (commonItems.length > 0) {
    output += 2 ** (commonItems.length - 1);
  }
  return output;
}

// ------------P2-----------------
let cardInstances: number[] = [];
let count: number = 0;

lines.forEach((line, i) => {
  count += countCardInstances(line, i);
});

console.log(count);

function countCardInstances(line: string, cardNumber: number): number {
  const lists: string[] = line.split(":")[1].trim().split("|");

  const winningNumbers: number[] = lists[0].match(/\d+/g)?.map(Number) || [];
  const myNumbers: number[] = lists[1]?.match(/\d+/g)?.map(Number) || [];

  const commonItems: number[] = myNumbers.filter((item) =>
    winningNumbers.includes(item)
  );

  cardInstances[cardNumber] = (cardInstances[cardNumber] ?? 0) + 1;

  for (let j = 0; j < cardInstances[cardNumber]; j++) {
    if (commonItems.length === 0) {
      continue;
    }
    for (let i = 1; i <= commonItems.length; i++) {
      cardInstances[cardNumber + i] = (cardInstances[cardNumber + i] ?? 0) + 1;
    }
  }

  return cardInstances[cardNumber];
}
