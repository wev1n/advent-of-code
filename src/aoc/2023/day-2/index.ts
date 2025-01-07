import fs from "fs";

const maxCount: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);

  return lines
    .map((line) => {
      return line
        .split(": ")[1]
        .split("; ")
        .map((set) => {
          const pulls = set.split(", ");
          return pulls.every((pull) => {
            const [count, color] = pull.split(" ");
            return maxCount[color] >= Number(count);
          });
        })
        .every((play) => play);
    })
    .reduce((s, result, i) => {
      return result ? s + (i + 1) : s;
    }, 0);
}

console.log(`p1: ${p1("./src/aoc/2023/day-2/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);

  return lines
    .map((line) => {
      const maxCountLocal: { [key: string]: number } = {
        red: 0,
        green: 0,
        blue: 0,
      };

      line
        .split(": ")[1]
        .split("; ")
        .forEach((set) => {
          const pulls = set.split(", ");
          pulls.forEach((pull) => {
            const [countStr, color] = pull.split(" ");
            const count = Number(countStr);

            if (maxCountLocal[color] < count) {
              maxCountLocal[color] = count;
            }
          });
        });
      return maxCountLocal.red * maxCountLocal.green * maxCountLocal.blue;
    })
    .reduce((s, v) => s + v, 0);
}

console.log(`p2: ${p2("./src/aoc/2023/day-2/input.txt")}`);
