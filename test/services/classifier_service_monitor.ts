import { classifierService } from "../../src";
import data from "../../data/training_dataset.json";

const message =
  "Kenapa ada balapan yang berbahaya di jalanan ini? Kok bisa sih sampai begini? Mana polisi";

classifierService.trainBatch(data);
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
