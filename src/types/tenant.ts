import { z } from 'zod';

export const tenantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Organization name is required'),
  domain: z.string().min(1, 'Domain is required'),
  logo: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  features: z.array(z.string()),
  maxUsers: z.number().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Tenant = z.infer<typeof tenantSchema>;