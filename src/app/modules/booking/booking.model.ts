import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

// Booking Schema
const BookingSchema: Schema = new Schema<TBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    pricePerHour: { type: Number},
    isReturned: { type: Boolean, default: false },
    isAdvanced: { type: Boolean, default: false },
    transactionId: { type: String},
  },

  {
    timestamps: true, // This adds `createdAt` and `updatedAt` fields
  },
);

export const Booking = model<TBooking>('Booking', BookingSchema);
