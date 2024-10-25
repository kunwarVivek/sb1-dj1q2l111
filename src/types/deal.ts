import { z } from 'zod';

export const DealPhase = {
  SCREENING: 'screening',
  PROSPECTING: 'prospecting',
  INITIAL_CONTACT: 'initial_contact',
  PRELIMINARY_DD: 'preliminary_dd',
  VALUATION: 'valuation',
  NEGOTIATION: 'negotiation',
  DUE_DILIGENCE: 'due_diligence',
  DEFINITIVE_AGREEMENT: 'definitive_agreement',
  CLOSING: 'closing',
  POST_MERGER: 'post_merger',
} as const;

export const DealType = {
  ACQUISITION: 'acquisition',
  MERGER: 'merger',
  JOINT_VENTURE: 'joint_venture',
  ASSET_PURCHASE: 'asset_purchase',
  STOCK_PURCHASE: 'stock_purchase',
} as const;

export const dealSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Deal name is required'),
  type: z.enum([
    DealType.ACQUISITION,
    DealType.MERGER,
    DealType.JOINT_VENTURE,
    DealType.ASSET_PURCHASE,
    DealType.STOCK_PURCHASE,
  ]),
  phase: z.enum([
    DealPhase.SCREENING,
    DealPhase.PROSPECTING,
    DealPhase.INITIAL_CONTACT,
    DealPhase.PRELIMINARY_DD,
    DealPhase.VALUATION,
    DealPhase.NEGOTIATION,
    DealPhase.DUE_DILIGENCE,
    DealPhase.DEFINITIVE_AGREEMENT,
    DealPhase.CLOSING,
    DealPhase.POST_MERGER,
  ]),
  value: z.number().min(0),
  targetCompany: z.string().min(1, 'Target company is required'),
  description: z.string(),
  status: z.string(),
  keyMetrics: z.object({
    revenue: z.number().optional(),
    ebitda: z.number().optional(),
    employees: z.number().optional(),
    marketShare: z.number().optional(),
  }).optional(),
  synergies: z.object({
    costSavings: z.number().optional(),
    revenueGrowth: z.number().optional(),
    operationalEfficiency: z.number().optional(),
  }).optional(),
  risks: z.array(z.object({
    category: z.string(),
    description: z.string(),
    impact: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    mitigation: z.string(),
  })).optional(),
  timeline: z.object({
    targetCloseDate: z.date().optional(),
    keyMilestones: z.array(z.object({
      date: z.date(),
      description: z.string(),
      completed: z.boolean(),
    })).optional(),
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Deal = z.infer<typeof dealSchema>;