import { readFileSync } from "fs";

let inputs = readFileSync("./input.txt", "utf-8")
  .split("\r\n")
  .filter((x) => !!x);

let sum = 0;
const numbers = "123456789";

const numbersAsStrings = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

inputs.forEach((word) => {
  let numbersArray = [];

  for (let i = 0; i < word.length; i++) {
    if (numbers.includes(word[i])) {
      numbersArray.push(word[i]);
    }

    for (let j = 3; j <= 5; j++) {
      if (numbersAsStrings[word.substring(i, i + j)] !== undefined) {
        numbersArray.push(numbersAsStrings[word.substring(i, i + j)]);
      }
    }
  }

  sum += parseInt(numbersArray[0] + "" + numbersArray[numbersArray.length - 1]);
});

console.log(sum);
