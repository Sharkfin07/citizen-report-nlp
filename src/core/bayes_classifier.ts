import bayes from "classificator";
import type {
  BatchItem,
  CategorizeResult,
  CategoryStatsResult,
  InfluentialToken,
  Naivebayes,
} from "classificator";
import { CATEGORIES, type CategoryName } from "../config/categories";
import { NLP_CONFIG } from "../config/nlp_config";

// This is a singleton class
export class BayesClassifier {
  private static instance: BayesClassifier | null = null;
  private readonly classifier: Naivebayes;

  private constructor() {
    this.classifier = bayes({ ...NLP_CONFIG.bayesOptions });
  }

  public static getInstance(): BayesClassifier {
    if (!BayesClassifier.instance) {
      BayesClassifier.instance = new BayesClassifier();
    }

    return BayesClassifier.instance;
  }

  public learn(text: string, category: CategoryName): this {
    this.classifier.learn(text, category);
    return this; // Returns `this` for chaining
  }

  public learnBatch(items: BatchItem[]): this {
    this.classifier.learnBatch(items);
    return this; // Returns `this` for chaining
  }

  public categorizeWithConfidence(text: string): {
    result: CategorizeResult;
    assignedCategory: CategoryName;
    confidence: number;
  } {
    const result = this.classifier.categorizeWithConfidence(
      text,
      NLP_CONFIG.confidenceThreshold,
    );

    const confidence = result.likelihoods.reduce((max, item) => {
      return item.proba > max ? item.proba : max;
    }, 0);

    const assignedCategory = (result.predictedCategory ??
      CATEGORIES.MANUAL_REVIEW) as CategoryName;

    return {
      result,
      assignedCategory,
      confidence,
    };
  }

  public topInfluentialTokens(text: string): InfluentialToken[] {
    return this.classifier.topInfluentialTokens(
      text,
      NLP_CONFIG.maxReasoningTokens,
    );
  }

  public getCategoryStats(): CategoryStatsResult {
    return this.classifier.getCategoryStats();
  }

  public getCategories(): string[] {
    return this.classifier.getCategories();
  }

  public reset(): this {
    this.classifier.reset();
    return this;
  }
}

export const bayesClassifier = BayesClassifier.getInstance();
