import * as fs from "fs";

function readInputFile(file: string): string[] {
  return fs.readFileSync(file, "utf-8").trim().replace(/\r/g, "").split("\n");
}

// ------------Helpers------------
type Distances = { [key: string]: { [key: string]: number } };
type ParsedData = { distances: Distances; locations: string[] };

function parseDistances(lines: string[]): ParsedData {
  const distances: Distances = {};
  const locations = new Set<string>();

  lines.forEach((line) => {
    const [part1, distance] = line.split(" = ");
    const [loc1, loc2] = part1.split(" to ");
    const dist = parseInt(distance);

    if (!distances[loc1]) distances[loc1] = {};
    if (!distances[loc2]) distances[loc2] = {};

    distances[loc1][loc2] = dist;
    distances[loc2][loc1] = dist;

    locations.add(loc1);
    locations.add(loc2);
  });

  return { distances, locations: Array.from(locations) };
}

function permute(arr: string[]): string[][] {
  if (arr.length <= 1) return [arr];
  const perms: string[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = permute(arr.slice(0, i).concat(arr.slice(i + 1)));
    rest.forEach((subPerm) => perms.push([arr[i], ...subPerm]));
  }
  return perms;
}

function calculateDistance(
  route: string[],
  distances: Distances
): number | null {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i];
    const to = route[i + 1];

    if (distances[from][to] === undefined) {
      return null;
    }

    totalDistance += distances[from][to];
  }
  return totalDistance;
}

// ------------P1-----------------
function p1(file: string): number {
  const lines = readInputFile(file);
  const { distances, locations } = parseDistances(lines);
  const routes = permute(locations);

  let minDistance = Infinity;

  routes.forEach((route) => {
    const distance = calculateDistance(route, distances);
    if (distance !== null && distance < minDistance) {
      minDistance = distance;
    }
  });

  return minDistance === Infinity ? -1 : minDistance;
}

console.log(`P1: ${p1("./src/aoc/2015/day-9/input.txt")}`);

// ------------P2-----------------
function p2(file: string): number {
  const lines = readInputFile(file);
  const { distances, locations } = parseDistances(lines);
  const routes = permute(locations);

  let maxDistance = 0;

  routes.forEach((route) => {
    const distance = calculateDistance(route, distances);
    if (distance !== null && distance > maxDistance) {
      maxDistance = distance;
    }
  });

  return maxDistance;
}

console.log(`P2: ${p2("./src/aoc/2015/day-9/input.txt")}`);
