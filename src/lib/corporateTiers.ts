if (typeof window !== "undefined") {
  throw new Error("CORPORATE_TIERS è un modulo server-only e non può essere importato nel browser.");
}

export interface CorporateTier {
  readonly id: string;
  readonly name: string;
  readonly unitAmountCents: number;
  readonly description: string;
}

export const CORPORATE_TIERS = {
  essential: {
    id: "essential",
    name: "Essential",
    unitAmountCents: 90000, // €900.00
    description: "Esperienza interattiva Black Bulls Lab per gruppi fino a 50 persone.",
  },
  advanced: {
    id: "advanced",
    name: "Advanced",
    unitAmountCents: 150000, // €1,500.00
    description: "Esperienza interattiva Black Bulls Lab per 50 - 150 persone.",
  },
  tailored: {
    id: "tailored",
    name: "Tailored",
    unitAmountCents: 250000, // €2,500.00
    description: "Esperienza bespoke completamente personalizzata oltre 150 persone.",
  },
} as const;

export type CorporateTierId = keyof typeof CORPORATE_TIERS;

export function getCorporateTier(tierId: string): CorporateTier | null {
  if (Object.prototype.hasOwnProperty.call(CORPORATE_TIERS, tierId)) {
    return CORPORATE_TIERS[tierId as CorporateTierId];
  }
  return null;
}
