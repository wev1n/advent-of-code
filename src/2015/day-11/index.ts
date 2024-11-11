import * as fs from "fs";

function readInputFile(file: string): string {
  return fs.readFileSync(file, "utf-8").trim();
}

// ------------Helpers------------
function incrementPassword(password: string): string {
  const chars = password.split("");

  for (let i = chars.length - 1; i >= 0; i--) {
    if (chars[i] === "z") {
      chars[i] = "a";
    } else {
      chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
      break;
    }
  }

  return chars.join("");
}

function hasStraight(password: string): boolean {
  for (let i = 0; i < password.length - 2; i++) {
    if (
      password.charCodeAt(i + 1) === password.charCodeAt(i) + 1 &&
      password.charCodeAt(i + 2) === password.charCodeAt(i) + 2
    ) {
      return true;
    }
  }
  return false;
}

function hasForbiddenLetters(password: string): boolean {
  return /[iol]/.test(password);
}

function hasTwoPairs(password: string): boolean {
  const pairs = password.match(/([a-z])\1/g);
  return pairs !== null && pairs.length >= 2;
}

function findNextPassword(password: string): string {
  let nextPassword = incrementPassword(password);

  while (
    !hasStraight(nextPassword) ||
    hasForbiddenLetters(nextPassword) ||
    !hasTwoPairs(nextPassword)
  ) {
    nextPassword = incrementPassword(nextPassword);
  }

  return nextPassword;
}

// ------------P1-----------------
function p1(file: string): string {
  const input = readInputFile(file);

  return findNextPassword(input);
}

// input: hepxxyzz
console.log(`P1: ${p1("./src/2015/day-11/input.txt")}`);

// ------------P2-----------------
function p2(file: string): string {
  const input = readInputFile(file);

  return findNextPassword(input);
}

// input: hepxxyzz
console.log(`P2: ${p2("./src/2015/day-11/input.txt")}`);
