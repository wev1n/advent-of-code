import fs from "fs";

// -----------Helpers-------------
function hasSymbol(str: string): boolean {
  // Check if string contains any non-numeric character that isn't '.'
  if (str?.length && str.split("").find((x) => isNaN(Number(x)) && x !== ".")) {
    return true;
  } else {
    return false;
  }
}

// ------------P1-----------------
function p1(file: string): number {
  const input: string[] = fs
    .readFileSync(file, "utf-8")
    .trim()
    .replace(/\r/g, "")
    .split("\n");

  const rows: number = input.length;
  const cols: number = input[0].length;

  let founds: number[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const number = "" + input[i][j];
      if (isNaN(Number(number))) continue;

      let num = number;
      while (++j < cols) {
        if (Number.isInteger(parseInt(input[i][j]))) {
          num += input[i][j];
        } else {
          break;
        }
      }

      const top =
        i === 0 ? "" : input[i - 1].substring(j - num.length - 1, j + 1);
      const bottom =
        i === rows - 1 ? "" : input[i + 1].substring(j - num.length - 1, j + 1);
      const left = input[i][j - num.length - 1] || "";
      const right = input[i][j] || "";

      if (
        hasSymbol(top) ||
        hasSymbol(bottom) ||
        hasSymbol(right) ||
        hasSymbol(left)
      ) {
        founds.push(Number(num));
      }
    }
  }

  return founds.reduce((a, c) => a + c, 0);
}

console.log(`P1: ${p1("./src/2023/day-3/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const input: string[] = fs
    .readFileSync(file, "utf-8")
    .trim()
    .replace(/\r/g, "")
    .split("\n");

  const rows: number = input.length;
  const cols: number = input[0].length;

  const gearsDic: { [key: string]: number[] } = {};

  const findGears = (str: string, num: string, i: number, j: number) => {
    j = j === -1 ? 0 : j;
    for (let k = 0; k < str.length; k++) {
      const ch = str.charAt(k);
      if (ch === "*") {
        const ind = `${i}-${j + k}`;
        gearsDic[ind] = gearsDic[ind]
          ? [...gearsDic[ind], parseInt(num)]
          : [parseInt(num)];
      }
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const n = "" + input[i][j];
      if (isNaN(Number(n))) continue;

      let num = n;
      while (++j < cols) {
        if (Number.isInteger(parseInt(input[i][j]))) num += input[i][j];
        else break;
      }

      const top =
        i === 0 ? "" : input[i - 1].substring(j - num.length - 1, j + 1);
      const btm =
        i === rows - 1 ? "" : input[i + 1].substring(j - num.length - 1, j + 1);
      const lft = input[i][j - num.length - 1] || "";
      const rgt = input[i][j] || "";

      findGears(top, num, i - 1, j - num.length - 1);
      findGears(btm, num, i + 1, j - num.length - 1);
      findGears(lft, num, i, j - num.length - 1);
      findGears(rgt, num, i, j);
    }
  }

  const v = Object.values(gearsDic)
    .filter((x): x is number[] => Array.isArray(x) && x.length === 2)
    .map((x) => x[0] * x[1])
    .reduce((a, x) => a + x, 0);

  return v;
}

console.log(`P2: ${p2("./src/2023/day-3/input.txt")}`);
