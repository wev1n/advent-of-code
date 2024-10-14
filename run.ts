const [, , file] = process.argv;

if (!file) {
  console.error("Error: Please provide a file to run.");
  process.exit(1);
}

require("ts-node").register();
require(require("path").resolve(file));
