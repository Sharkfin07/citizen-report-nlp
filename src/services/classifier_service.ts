import type { BatchItem } from "classificator";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  type CategoryName,
} from "../config/categories";
import { bayesClassifier } from "../core/bayes_classifier";
import * as fs from "fs";

export interface ClassifierReasoningItem {
  token: string;
  probability: number;
  frequency: number;
}

export interface ClassifierResultData {
  originalText: string;
  assignedCategory: CategoryName;
  assignedLabel: string;
  confidence: number;
  reasoning: ClassifierReasoningItem[];
  analyzedAt: string;
}

export interface ClassifierResult {
  success: true;
  data: ClassifierResultData;
}

export class ClassifierService {
  public get classifier() {
    return bayesClassifier;
  }

  public train(text: string, category: CategoryName): void {
    bayesClassifier.learn(text, category);
  }

  public trainBatch(items: BatchItem[]): void {
    bayesClassifier.learnBatch(items);
  }

  public classify(text: string): ClassifierResult {
    const cleanText = text.trim();

    const { assignedCategory, confidence } =
      bayesClassifier.categorizeWithConfidence(cleanText);

    const reasoning =
      assignedCategory === CATEGORIES.MANUAL_REVIEW
        ? []
        : bayesClassifier.topInfluentialTokens(cleanText);

    return {
      success: true,
      data: {
        originalText: cleanText,
        assignedCategory,
        assignedLabel: CATEGORY_LABELS[assignedCategory],
        confidence,
        reasoning,
        analyzedAt: new Date().toISOString(),
      },
    };
  }

  public serialize(savePath: string | null = null): string {
    const json = bayesClassifier.toJson();
    if (savePath) {
      fs.writeFileSync(savePath, json, "utf-8");
    }
    return json;
  }

  public deserialize(json: string | object): void {
    bayesClassifier.loadJson(json);
  }

  public deserializeFromPath(loadPath: string): void {
    bayesClassifier.loadJson(fs.readFileSync(loadPath, "utf-8"));
  }

  public reset(): void {
    bayesClassifier.reset();
  }
}

export const classifierService = new ClassifierService();
