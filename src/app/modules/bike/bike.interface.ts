import { Types } from 'mongoose';

export type TBike = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable?: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
};
