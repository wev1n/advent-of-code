import * as fs from "fs";

// ------------P1-----------------
const lines = fs.readFileSync("input.txt", "utf-8").split("\n");
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
