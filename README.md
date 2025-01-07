# aoc-leetcode

### This is a collection of all the solutions I have made for [Advent of Code](https://adventofcode.com/) and [LeetCode](https://leetcode.com/). Feel free to check them out!

## Table of Contents

1. [Introduction](#introduction)
2. [Setup & Installation](#setup--installation)
3. [Contribution Guidelines](#contribution-guidelines)

---

## Introduction

This repository contains solutions for Advent of Code challenges and LeetCode problems. The solutions are organized by year and day within the `src/aoc` directory for Advent of Code, and by problem number within the `src/leetcode` directory for LeetCode.

The goal of this project is to provide clear and efficient solutions to various coding challenges, helping to improve problem-solving skills and understanding of algorithms and data structures.

If you have a better solution, feel free to open an issue and submit it!

---

## Setup & Installation

Follow these instructions to set up the project on your local machine.

### Prerequisites

Make sure you have the following tools installed:

- **Node.js**: v20.x or above.
- **npm**, **pnpm**, **yarn**, or **bun**: Choose your preferred package manager.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/wev1n/aoc-leetcode
```

2. Navigate to the project directory:

```bash
cd aoc-leetcode
```

3. Install the dependencies:

```bash
npm install
```

4. For Advent of Code problems, ensure you create an `input.txt` file within the corresponding `day-X` folder. Visit [Advent of Code](https://adventofcode.com/) to obtain your specific input data. Finally, run the provided command. Ensure that the `day-X` folder is correct:

```bash
npm start src/aoc/2015/day-1/index.ts
```

If the problem is LeetCode related, simply run the command. Ensure that the `X.ts` file corresponds to the problem number you want to solve:

```bash
npm run start src/leetcode/412.ts
```

### Reporting Issues

If you encounter a bug or want to request a feature, please report it through **GitHub Issues** with the following information:

- Steps to reproduce the issue.
- Screenshots (if applicable).
- Relevant system or environment details.

---
