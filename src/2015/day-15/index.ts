import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
function parseIngredients(line: string) {
  const regex =
    /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;
  const match = line.match(regex);

  if (match) {
    return {
      name: match[1],
      capacity: parseInt(match[2]),
      durability: parseInt(match[3]),
      flavor: parseInt(match[4]),
      texture: parseInt(match[5]),
      calories: parseInt(match[6]),
    };
  }

  return null;
}

function calculateScore(ingredients: any[], amounts: number[]): number {
  let capacity = 0,
    durability = 0,
    flavor = 0,
    texture = 0,
    calories = 0;

  for (let i = 0; i < ingredients.length; i++) {
    capacity += ingredients[i].capacity * amounts[i];
    durability += ingredients[i].durability * amounts[i];
    flavor += ingredients[i].flavor * amounts[i];
    texture += ingredients[i].texture * amounts[i];
    calories += ingredients[i].calories * amounts[i];
  }

  capacity = Math.max(capacity, 0);
  durability = Math.max(durability, 0);
  flavor = Math.max(flavor, 0);
  texture = Math.max(texture, 0);

  return capacity * durability * flavor * texture;
}

function generateCombinations(
  ingredientCount: number,
  totalAmount: number
): number[][] {
  const combinations: number[][] = [];

  function generate(
    remainingAmount: number,
    index: number,
    currentCombination: number[]
  ) {
    if (index === ingredientCount - 1) {
      currentCombination.push(remainingAmount);
      combinations.push([...currentCombination]);
      currentCombination.pop();
      return;
    }

    for (let i = 0; i <= remainingAmount; i++) {
      currentCombination.push(i);
      generate(remainingAmount - i, index + 1, currentCombination);
      currentCombination.pop();
    }
  }

  generate(totalAmount, 0, []);
  return combinations;
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  const ingredients = lines.map(parseIngredients);
  const combinations = generateCombinations(ingredients.length, 100);

  let maxScore = 0;

  combinations.forEach((combination) => {
    const score = calculateScore(ingredients, combination);
    maxScore = Math.max(maxScore, score);
  });

  return maxScore;
}

console.log(`P1: ${p1("./src/2015/day-15/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);
  const ingredients = lines.map(parseIngredients);
  const combinations = generateCombinations(ingredients.length, 100);

  let maxScore = 0;

  combinations.forEach((amounts) => {
    let totalCalories = 0;
    for (let i = 0; i < ingredients.length; i++) {
      totalCalories += ingredients[i].calories * amounts[i];
    }

    if (totalCalories === 500) {
      const score = calculateScore(ingredients, amounts);
      maxScore = Math.max(maxScore, score);
    }
  });

  return maxScore;
}

console.log(`P2: ${p2("./src/2015/day-15/input.txt")}`);
