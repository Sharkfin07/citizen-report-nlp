import { bayesClassifier } from "../../src/core/bayes_classifier";
import data from "../../data/training_dataset.json";

bayesClassifier.learnBatch(data);
const result = bayesClassifier.categorizeWithConfidence(
  "Sepertinya, ada kerusakan pada jalan ini",
);
console.log(result);
