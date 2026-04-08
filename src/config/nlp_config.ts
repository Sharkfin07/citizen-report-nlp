import { INDONESIAN_STOPWORDS } from "./stopwords";

const STOPWORDS_SET = new Set<string>(INDONESIAN_STOPWORDS);

export const tokenPreprocessor = (tokens: string[]): string[] => {
  return tokens
    .map((t) => t.trim().toLowerCase())
    .filter((t) => !STOPWORDS_SET.has(t) && t.length > 2);
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
