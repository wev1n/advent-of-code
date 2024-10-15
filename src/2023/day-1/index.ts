import { readFileSync } from "fs";

const inputs: string[] = readFileSync("./src/2023/day-1/input.txt", "utf-8")
  .split("\r\n")
  .filter((x: string) => !!x);

let sum: number = 0;
const numbers: string = "123456789";

const numbersAsStrings: { [key: string]: number } = {
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

inputs.forEach((word: string) => {
  let numbersArray: (string | number)[] = [];

  for (let i = 0; i < word.length; i++) {
    if (numbers.includes(word[i])) {
      numbersArray.push(word[i]);
    }

    for (let j = 3; j <= 5; j++) {
      const substring: string = word.substring(i, i + j);
      if (
        numbersAsStrings[substring as keyof typeof numbersAsStrings] !==
        undefined
      ) {
        numbersArray.push(numbersAsStrings[substring]);
      }
    }
  }

  if (numbersArray.length >= 2) {
    const first: string = numbersArray[0].toString();
    const last: string = numbersArray[numbersArray.length - 1].toString();
    sum += parseInt(first + last);
  }
});

console.log(sum);
