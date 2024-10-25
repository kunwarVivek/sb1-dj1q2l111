import { z } from 'zod';

export const DueDiligenceCategory = {
  FINANCIAL: 'financial',
  LEGAL: 'legal',
  OPERATIONAL: 'operational',
  HR: 'hr',
  IT: 'it',
  COMPLIANCE: 'compliance',
  COMMERCIAL: 'commercial',
  ENVIRONMENTAL: 'environmental',
} as const;

export const DueDiligenceStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  PENDING_REVIEW: 'pending_review',
  COMPLETED: 'completed',
  FLAGGED: 'flagged',
} as const;

export const dueDiligenceSchema = z.object({
  id: z.string().optional(),
  dealId: z.string(),
  category: z.enum([
    DueDiligenceCategory.FINANCIAL,
    DueDiligenceCategory.LEGAL,
    DueDiligenceCategory.OPERATIONAL,
    DueDiligenceCategory.HR,
    DueDiligenceCategory.IT,
    DueDiligenceCategory.COMPLIANCE,
    DueDiligenceCategory.COMMERCIAL,
    DueDiligenceCategory.ENVIRONMENTAL,
  ]),
  status: z.enum([
    DueDiligenceStatus.NOT_STARTED,
    DueDiligenceStatus.IN_PROGRESS,
    DueDiligenceStatus.PENDING_REVIEW,
    DueDiligenceStatus.COMPLETED,
    DueDiligenceStatus.FLAGGED,
  ]),
  checklist: z.array(z.object({
    id: z.string(),
    task: z.string(),
    status: z.enum(['pending', 'completed', 'flagged']),
    assignedTo: z.string().optional(),
    dueDate: z.date().optional(),
    comments: z.array(z.object({
      user: z.string(),
      text: z.string(),
      timestamp: z.date(),
    })).optional(),
  })),
  findings: z.array(z.object({
    category: z.string(),
    description: z.string(),
    impact: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    recommendation: z.string(),
  })).optional(),
  documents: z.array(z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    status: z.enum(['pending', 'received', 'reviewed', 'approved', 'rejected']),
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DueDiligence = z.infer<typeof dueDiligenceSchema>;