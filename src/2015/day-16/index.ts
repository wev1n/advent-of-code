import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

type AuntSue = {
  id: number;
  attributes: Record<string, number>;
};

// ------------Helpers------------
function parseLine(line: string): AuntSue {
  const match = line.match(/Sue (\d+): (.*)/);

  if (!match) throw new Error(`Invalid format on line: ${line}`);

  const id = parseInt(match[1], 10);
  const attributes: Record<string, number> = {};
  const parts = match[2].split(", ");

  parts.forEach((part) => {
    const [key, value] = part.split(": ");
    attributes[key] = parseInt(value, 10);
  });

  return { id, attributes };
}

function isMatchingAuntSue(aunt: AuntSue, tickerTape: Record<string, number>) {
  for (const key in aunt.attributes) {
    if (
      tickerTape[key] !== undefined &&
      aunt.attributes[key] !== tickerTape[key]
    ) {
      return false;
    }
  }

  return true;
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  const aunts = lines.map(parseLine);

  const tickerTape = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  for (const aunt of aunts) {
    if (isMatchingAuntSue(aunt, tickerTape)) {
      return aunt.id;
    }
  }

  throw new Error("No matching Aunt Sue found");
}

console.log(`P1: ${p1("./src/2015/day-16/input.txt")}`);
