import { ID_REMOVABLE_SUFFIXES, ID_STOPWORDS } from "./stopwords";

const STOPWORDS_SET = new Set<string>(ID_STOPWORDS);
const REMOVABLE_SUFFIXES = [...ID_REMOVABLE_SUFFIXES].sort(
  (a, b) => b.length - a.length,
);

const MIN_TOKEN_LENGTH = 3;
const MIN_ROOT_LENGTH = 3;

const normalizeToken = (token: string): string => {
  return token
    .trim()
    .toLowerCase()
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""); // Exclude punctuations
};

const stripRemovableSuffix = (token: string): string => {
  for (const suffix of REMOVABLE_SUFFIXES) {
    if (!token.endsWith(suffix)) {
      continue;
    }

    const root = token.slice(0, -suffix.length);

    if (root.length >= MIN_ROOT_LENGTH) {
      return root;
    }
  }

  return token;
};

export const tokenPreprocessor = (tokens: string[]): string[] => {
  return tokens
    .map((token) => stripRemovableSuffix(normalizeToken(token)))
    .filter(
      (token) => token.length >= MIN_TOKEN_LENGTH && !STOPWORDS_SET.has(token),
    );
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
