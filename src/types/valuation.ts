import { z } from 'zod';

export const ValuationMethod = {
  DCF: 'dcf',
  COMPARABLE_COMPANIES: 'comparable_companies',
  PRECEDENT_TRANSACTIONS: 'precedent_transactions',
  ASSET_BASED: 'asset_based',
  LBO: 'lbo',
} as const;

export const valuationSchema = z.object({
  id: z.string().optional(),
  dealId: z.string(),
  methods: z.array(z.object({
    type: z.enum([
      ValuationMethod.DCF,
      ValuationMethod.COMPARABLE_COMPANIES,
      ValuationMethod.PRECEDENT_TRANSACTIONS,
      ValuationMethod.ASSET_BASED,
      ValuationMethod.LBO,
    ]),
    value: z.number(),
    assumptions: z.array(z.object({
      key: z.string(),
      value: z.number(),
      description: z.string(),
    })),
    multipliers: z.array(z.object({
      metric: z.string(),
      value: z.number(),
      description: z.string(),
    })).optional(),
  })),
  financialMetrics: z.object({
    revenue: z.number(),
    ebitda: z.number(),
    netIncome: z.number(),
    freeCashFlow: z.number(),
    netDebt: z.number(),
    workingCapital: z.number(),
  }),
  sensitivityAnalysis: z.array(z.object({
    variable: z.string(),
    scenarios: z.array(z.object({
      change: z.number(),
      impact: z.number(),
    })),
  })).optional(),
  synergies: z.object({
    revenue: z.number(),
    cost: z.number(),
    timeline: z.object({
      years: z.number(),
      breakdown: z.array(z.object({
        year: z.number(),
        value: z.number(),
      })),
    }),
  }).optional(),
  recommendedValue: z.object({
    low: z.number(),
    mid: z.number(),
    high: z.number(),
    rationale: z.string(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Valuation = z.infer<typeof valuationSchema>;