import { z } from 'zod';

export const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
} as const;

export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum([
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.ANALYST,
    UserRole.VIEWER,
  ]),
  tenantId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;