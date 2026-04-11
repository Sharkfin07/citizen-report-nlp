import { classifierService } from "../../src";
import { datasetService } from "../../src/services/dataset_service";

const message = "";

classifierService.trainBatch(datasetService.getDataset());
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
