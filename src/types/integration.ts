import { z } from 'zod';

export const IntegrationType = {
  FULL: 'full',
  PARTIAL: 'partial',
  STANDALONE: 'standalone',
} as const;

export const IntegrationWorkstream = {
  ORGANIZATION: 'organization',
  OPERATIONS: 'operations',
  IT_SYSTEMS: 'it_systems',
  HR: 'hr',
  FINANCE: 'finance',
  SALES: 'sales',
  MARKETING: 'marketing',
  LEGAL: 'legal',
  CULTURE: 'culture',
} as const;

export const integrationSchema = z.object({
  id: z.string().optional(),
  dealId: z.string(),
  type: z.enum([
    IntegrationType.FULL,
    IntegrationType.PARTIAL,
    IntegrationType.STANDALONE,
  ]),
  workstreams: z.array(z.object({
    id: z.string(),
    type: z.enum([
      IntegrationWorkstream.ORGANIZATION,
      IntegrationWorkstream.OPERATIONS,
      IntegrationWorkstream.IT_SYSTEMS,
      IntegrationWorkstream.HR,
      IntegrationWorkstream.FINANCE,
      IntegrationWorkstream.SALES,
      IntegrationWorkstream.MARKETING,
      IntegrationWorkstream.LEGAL,
      IntegrationWorkstream.CULTURE,
    ]),
    status: z.enum(['not_started', 'in_progress', 'completed']),
    progress: z.number().min(0).max(100),
    tasks: z.array(z.object({
      id: z.string(),
      name: z.string(),
      status: z.enum(['pending', 'in_progress', 'completed', 'blocked']),
      assignedTo: z.string().optional(),
      dueDate: z.date().optional(),
      dependencies: z.array(z.string()).optional(),
    })),
  })),
  synergies: z.array(z.object({
    id: z.string(),
    category: z.string(),
    description: z.string(),
    targetValue: z.number(),
    actualValue: z.number().optional(),
    status: z.enum(['identified', 'in_progress', 'achieved', 'at_risk']),
    timeline: z.object({
      startDate: z.date(),
      targetDate: z.date(),
      completionDate: z.date().optional(),
    }),
  })),
  risks: z.array(z.object({
    id: z.string(),
    category: z.string(),
    description: z.string(),
    impact: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    probability: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    mitigation: z.string(),
    status: z.enum(['open', 'mitigated', 'closed']),
  })),
  milestones: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    dueDate: z.date(),
    status: z.enum(['pending', 'in_progress', 'completed', 'delayed']),
    dependencies: z.array(z.string()).optional(),
  })),
  metrics: z.object({
    employeeRetention: z.number().optional(),
    customerRetention: z.number().optional(),
    systemIntegration: z.number().optional(),
    culturalAlignment: z.number().optional(),
    synergiesAchieved: z.number().optional(),
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Integration = z.infer<typeof integrationSchema>;