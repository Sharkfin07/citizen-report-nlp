/**
 * This is where the single source of truth for
 * categories recognized by the NLP.
 */

// ! Do not modify
export const CATEGORIES = {
  // * Basic Infrastructure
  PUBLIC_WORKS: "PUBLIC_WORKS",
  ENVIRONMENT: "ENVIRONMENT",
  TRANSPORTATION: "TRANSPORTATION",
  WATER_SUPPLY: "WATER_SUPPLY",
  TELECOMMUNICATION: "TELECOMMUNICATION",

  // * Social Services, Emergency, & Public Order
  PUBLIC_ORDER: "PUBLIC_ORDER",
  HEALTH: "HEALTH",
  FIRE_AND_RESCUE: "FIRE_AND_RESCUE",

  // * System Fallback
  MANUAL_REVIEW: "MANUAL_REVIEW",
} as const;

export type CategoryName = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// Go ahead and modify if u want :)
export const CATEGORY_LABELS: Record<CategoryName, string> = {
  // * Basic Infrastructure
  [CATEGORIES.PUBLIC_WORKS]: "Dinas Pekerjaan Umum dan Penataan Ruang (DPUPR)",
  [CATEGORIES.ENVIRONMENT]: "Dinas Lingkungan Hidup dan Kebersihan (DLHK)",
  [CATEGORIES.TRANSPORTATION]: "Dinas Perhubungan (Dishub)",
  [CATEGORIES.WATER_SUPPLY]: "Perusahaan Daerah Air Minum (PDAM)",
  [CATEGORIES.TELECOMMUNICATION]:
    "Dinas Komunikasi dan Informatika (Diskominfo)",

  // * Social Services, Emergency, & Public Order
  [CATEGORIES.PUBLIC_ORDER]: "Satuan Polisi Pamong Praja (Satpol PP)",
  [CATEGORIES.HEALTH]: "Dinas Kesehatan (Dinkes)",
  [CATEGORIES.FIRE_AND_RESCUE]:
    "Dinas Pemadam Kebakaran dan Penyelamatan (Damkar)",

  // * System Fallback
  [CATEGORIES.MANUAL_REVIEW]: "Menunggu Tinjauan Admin",
};
