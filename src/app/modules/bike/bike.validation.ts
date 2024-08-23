import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    model: z.string(),
    brand: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    cc: z.number(),
    year: z.number(),
    isAvailable: z.boolean(),
  }),
});

export const bikeValidations = {
  createBikeValidationSchema,
};
