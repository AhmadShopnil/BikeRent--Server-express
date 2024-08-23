import { z } from 'zod';

// const createBookingValidationSchema = z.object({
//   body: z.object({
//     userId: z.string(),
//     bikeId: z.string(),
//     startTime: z.string().datetime(),
//     returnTime: z.string().datetime().optional(),
//     totalCost: z.number(),
//     isReturned: z.boolean(),
//   }),
// });
const createBookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string(),
    startTime: z.string().datetime(),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
};
