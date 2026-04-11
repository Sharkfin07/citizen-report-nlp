export {
  CATEGORIES,
  CATEGORY_LABELS,
  type CategoryName,
} from "./config/categories";
export { NLP_CONFIG, tokenPreprocessor } from "./config/nlp_config";
export { ID_STOPWORDS, ID_REMOVABLE_SUFFIXES } from "./config/stopwords";

export { BayesClassifier, bayesClassifier } from "./core/bayes_classifier";

export {
  ClassifierService,
  classifierService,
  type ClassifierReasoningItem,
  type ClassifierResult,
  type ClassifierResultData,
} from "./services/classifier_service";
