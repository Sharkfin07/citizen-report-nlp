import { bayesClassifier } from "../../src/core/bayes_classifier";
import data from "../../data/training_dataset.json";

bayesClassifier.learnBatch(data);
const result = bayesClassifier.categorizeWithConfidence("Ada evakuasi!");
console.log(`Assigned category: ${result.assignedCategory}`);
console.log(`Confidence: ${result.confidence}`);

console.log("\nOther probabilities:");
result.result.likelihoods.forEach((likelihood) => {
  console.log(
    `Category: ${likelihood.category} (Probability: ${likelihood.proba})`,
  );
});
