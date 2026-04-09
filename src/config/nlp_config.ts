import { ID_STOPWORDS } from "./stopwords";

export const tokenPreprocessor = (tokens: string[]): string[] => {
  const STOPWORDS_SET = new Set<string>(ID_STOPWORDS); // Set of words ignored by the NLP
  const MAX_IGNORE_LENGTH = 2; // Minimum length of words to be considered by the NLP

  return tokens
    .map((t) => t.trim().toLowerCase())
    .filter((t) => !STOPWORDS_SET.has(t) && t.length > MAX_IGNORE_LENGTH);
};

export const NLP_CONFIG = {
  confidenceThreshold: 0.6,
  maxReasoningTokens: 5,
  bayesOptions: {
    alpha: 0.5,
    fitPrior: false,
    tokenPreprocessor: tokenPreprocessor,
  },
} as const;
