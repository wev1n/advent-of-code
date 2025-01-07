// FizzBuzz

// Given an integer n, return a string array answer (1-indexed) where:

// answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
// answer[i] == "Fizz" if i is divisible by 3.
// answer[i] == "Buzz" if i is divisible by 5.
// answer[i] == i (as a string) if none of the above conditions are true.

function fizzBuzz(n: number): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    result[i - 1] = i + "";

    if (i % 3 === 0) result[i - 1] = "Fizz";
    if (i % 5 === 0) result[i - 1] = "Buzz";
    if (i % 3 === 0 && i % 5 === 0) result[i - 1] = "FizzBuzz";
  }

  return result;
}

console.log(fizzBuzz(3));
console.log(fizzBuzz(5));
console.log(fizzBuzz(15));
