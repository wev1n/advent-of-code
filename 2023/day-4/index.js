import * as fs from "fs";

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

// ------------P1-----------------
let result = 0;

lines.forEach((line) => {
  result += countCardPoints(line);
});

console.log(result);

function countCardPoints(line) {
  const lists = line.split(":")[1].trim().split("|");

  const [winningNumbers, myNumbers] = lists.map(
    (item) => item.match(/\d+/g)?.map(Number) || []
  );

  const commonItems = myNumbers.filter((item) => winningNumbers.includes(item));

  let output = 0;
  if (commonItems.length > 0) {
    output += 2 ** (commonItems.length - 1);
  }
  return output;
}

// ------------P2-----------------
let cardInstances = [];
let count = 0;

lines.forEach((line, i) => {
  count += countCardInstances(line, i);
});

console.log(count);

function countCardInstances(line, cardNumber) {
  const lists = line.split(":")[1].trim().split("|");

  const [winningNumbers, myNumbers] = lists.map(
    (item) => item.match(/\d+/g)?.map(Number) || []
  );
  const commonItems = myNumbers.filter((item) => winningNumbers.includes(item));

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
