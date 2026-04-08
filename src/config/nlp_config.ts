import { ID_STOPWORDS } from "./stopwords";

const STOPWORDS_SET = new Set<string>(ID_STOPWORDS); // Set of words ignored by the NLP
const IGNORE_LENGTH = 3; // Minimum length of words to be considered by the NLP

export const tokenPreprocessor = (tokens: string[]): string[] => {
  return tokens
    .map((t) => t.trim().toLowerCase())
    .filter((t) => !STOPWORDS_SET.has(t) && t.length >= IGNORE_LENGTH);
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
