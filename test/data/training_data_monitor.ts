import data from "../../data/training_dataset.json";

console.log(`Total: ${data.length}`);

// * Count entries per categories
console.log("Per Categories:");
let counter: Record<string, number> = {};
data.forEach((entry) => {
  if (!(entry.category in counter)) {
    counter[entry.category] = 0;
  }
  counter[entry.category]++;
});

Object.entries(counter).forEach((entry) =>
  console.log(`${entry[0]}: ${entry[1]}`),
);
