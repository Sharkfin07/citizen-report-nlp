import { bayesClassifier } from "../../src/core/bayes_classifier";
import data from "../../data/training_dataset.json";

bayesClassifier.learnBatch(data);
console.log(
  bayesClassifier.categorizeWithConfidence(
    "Sepertinya ada kebakaran di dapur rumah itu",
  ),
);

console.log(bayesClassifier.toJson());
