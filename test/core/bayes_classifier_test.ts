import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { CATEGORIES } from "../../src/config/categories";
import { NLP_CONFIG } from "../../src/config/nlp_config";
import {
  BayesClassifier,
  bayesClassifier,
} from "../../src/core/bayes_classifier";

describe("BayesClassifier", () => {
  beforeEach(() => {
    bayesClassifier.reset();
  });

  it("should always return the same singleton instance", () => {
    const first = BayesClassifier.getInstance();
    const second = BayesClassifier.getInstance();

    assert.strictEqual(first, second);
  });

  it("should train model first, then classify report into expected category", () => {
    bayesClassifier.learnBatch([
      {
        text: "Jalan utama berlubang parah, aspal terkelupas, dan drainase rusak sehingga kendaraan sering tergelincir ketika hujan deras di kawasan Tanah.",
        category: CATEGORIES.PUBLIC_WORKS,
      },
      {
        text: "Lampu lalu lintas di persimpangan besar sering mati total pada jam sibuk sehingga arus kendaraan kacau dan antrean mengular panjang.",
        category: CATEGORIES.TRANSPORTATION,
      },
      {
        text: "Sampah menumpuk berhari hari di TPS lingkungan padat penduduk, menimbulkan bau menyengat dan mengundang banyak lalat.",
        category: CATEGORIES.ENVIRONMENT,
      },
    ]);

    const message =
      "Mohon perbaiki jalan berlubang dan aspal rusak di depan pasar karena sangat membahayakan pengendara saat hujan.";
    const prediction = bayesClassifier.categorizeWithConfidence(message);

    assert.strictEqual(prediction.assignedCategory, CATEGORIES.PUBLIC_WORKS);
    assert.ok(prediction.confidence >= NLP_CONFIG.confidenceThreshold);
  });

  it("should return fallback MANUAL_REVIEW when model has not been trained", () => {
    const message = "Guys, kok ada gajah di atas pohon?";
    const prediction = bayesClassifier.categorizeWithConfidence(message);

    assert.strictEqual(prediction.assignedCategory, CATEGORIES.MANUAL_REVIEW);
  });

  it("should provide reasoning tokens after training", () => {
    bayesClassifier.learn(
      "Pipa PDAM bocor di gang warga dan tekanan air sangat kecil sepanjang hari.",
      CATEGORIES.WATER_SUPPLY,
    );

    const tokens = bayesClassifier.topInfluentialTokens(
      "Tekanan air PDAM kecil karena pipa bocor sejak kemarin",
    );

    assert.ok(Array.isArray(tokens));
    assert.ok(tokens.length <= NLP_CONFIG.maxReasoningTokens);
  });
});
