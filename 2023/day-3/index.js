import fs from "fs"

function hasSymbol(str) {
  if (str?.length && str.split("").find(x => isNaN(x) && x !== '.')) {
    return true;
  } else {
    return false;
  }
}

function p1(file) {
  const input = fs
    .readFileSync(file, "utf-8")
    .trim()
    .replace(/\r/g, "")
    .split("\n");

  let rows = input.length;
  let cols = input[0].length;

  let founds = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const number = "" + input[i][j];
      if (isNaN(number)) continue;

      let num = number;
      while (++j < cols) {
        if (Number.isInteger(parseInt(input[i][j]))) {
          num += input[i][j];
        } else {
          break;
        }
      }

      const top = i === 0 ? "" : input[i-1].substring(j - num.length - 1, j + 1)
      const bottom = i === rows - 1 ? "" : input[i+1].substring(j - num.length - 1, j + 1)
      const left = input[i][j - num.length - 1] || ""
      const right = input[i][j] || ""

      if(hasSymbol(top) || hasSymbol(bottom) || hasSymbol(right) || hasSymbol(left)){
        founds.push(Number(num))
      }
    }
  }

  return founds.reduce((a, c) => a + c, 0)
}

console.log(`P1: ${p1("./input.txt")}`);
