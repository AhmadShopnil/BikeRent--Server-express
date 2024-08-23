import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().max(20).optional(),
    address: z.string(),
    role: z.enum(['user', 'admin']),
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

export const userValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
