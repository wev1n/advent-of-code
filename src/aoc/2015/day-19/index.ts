import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().split("\n");
}

type Rule = {
  from: string;
  to: string;
};

function parseInput(file: string): { rules: Rule[]; molecule: string } {
  const lines = readInputFile(file);
  const rules: Rule[] = [];
  let molecule = "";

  for (const line of lines) {
    if (line.includes("=>")) {
      const [from, to] = line.split("=>").map((s) => s.trim());
      rules.push({ from, to });
    } else if (line.trim() !== "") {
      molecule = line.trim();
    }
  }

  return { rules, molecule };
}

function generateMolecules(rules: Rule[], molecule: string): number {
  const uniqueMolecules = new Set<string>();

  for (const { from, to } of rules) {
    let startIndex = 0;
    while ((startIndex = molecule.indexOf(from, startIndex)) !== -1) {
      const newMolecule =
        molecule.slice(0, startIndex) +
        to +
        molecule.slice(startIndex + from.length);
      uniqueMolecules.add(newMolecule);
      startIndex++;
    }
  }

  return uniqueMolecules.size;
}

function p1(file: string): number {
  const { rules, molecule } = parseInput(file);
  return generateMolecules(rules, molecule);
}

console.log(`P1: ${p1("./src/aoc/2015/day-19/input.txt")}`);
