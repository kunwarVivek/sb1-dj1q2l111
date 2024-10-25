import { z } from 'zod';

export const ProspectStatus = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  NEGOTIATING: 'negotiating',
  CLOSED: 'closed',
} as const;

export const prospectSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  revenue: z.number().min(0, 'Revenue must be a positive number'),
  employees: z.number().min(1, 'Number of employees must be at least 1'),
  location: z.string().min(1, 'Location is required'),
  status: z.enum([
    ProspectStatus.NEW,
    ProspectStatus.CONTACTED,
    ProspectStatus.QUALIFIED,
    ProspectStatus.NEGOTIATING,
    ProspectStatus.CLOSED,
  ]),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Prospect = z.infer<typeof prospectSchema>;