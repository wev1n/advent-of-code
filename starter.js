import { readFileSync } from "fs";

let inputs = readFileSync("./input.txt", "utf-8")
  .split("\r\n")
  .filter((x) => !!x);

// ------------------------------------------

inputs.forEach((word) => {});

console.log(inputs);
