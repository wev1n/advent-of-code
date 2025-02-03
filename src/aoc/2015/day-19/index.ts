import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().split("\n");
}

// ------------Types------------
type Rule = {
  from: string;
  to: string;
};

// ------------Helpers------------
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

function fabricateMoleculeRandomized(rules: Rule[], target: string): number {
  let steps = 0;
  let molecule = target;

  while (molecule !== "e") {
    let replaced = false;

    rules.sort(() => Math.random() - 0.5);

    for (const { from, to } of rules) {
      const match = molecule.indexOf(to);
      if (match !== -1) {
        molecule = molecule.replace(to, from);
        steps++;
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      steps = 0;
      molecule = target;
    }
  }

  return steps;
}

// ------------P1-----------------
function p1(file: string): number {
  const { rules, molecule } = parseInput(file);
  return generateMolecules(rules, molecule);
}

console.log(`P1: ${p1("./src/aoc/2015/day-19/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const { rules, molecule } = parseInput(file);
  return fabricateMoleculeRandomized(rules, molecule);
}

console.log(`P2: ${p2("./src/aoc/2015/day-19/input.txt")}`);
