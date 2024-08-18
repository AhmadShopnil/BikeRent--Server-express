import { Types } from 'mongoose';

export type TBooking = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned?: boolean;
};
