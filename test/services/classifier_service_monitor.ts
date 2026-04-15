import { classifierService } from "../../src";
import * as fs from "fs";

const message = "Pak, ada balap liar di sini!";

const json: string = fs.readFileSync("data/state/state-v1.json", "utf-8");
classifierService.deserialize(json);
const result = classifierService.classify(message).data;

// * Logger
console.log(`"${result.originalText}"`);
console.log(
  `Predicted Category: ${result.assignedCategory} (${result.assignedLabel})`,
);
console.log(`Confidence: ${result.confidence}`);

console.log("Reasoning Token:");
result.reasoning.forEach((token, i) => {
  console.log(`[T${i}]`);
  console.log(`Token: ${token.token}`);
  console.log(`Probability: ${token.probability}`);
  console.log(`Frequency: ${token.frequency}`);
});
