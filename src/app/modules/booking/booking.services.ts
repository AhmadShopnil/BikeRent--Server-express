import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUserJwtPayload } from '../user/user.interface';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const addBookingInToDB = async ({
  bookingData,
  user,
}: {
  bookingData: TBooking;
  user: TUserJwtPayload;
}) => {
  const modiFiedBookingData = { ...bookingData };
  modiFiedBookingData.returnTime = null;
  modiFiedBookingData.isReturned = false;
  modiFiedBookingData.totalCost = 0;
  modiFiedBookingData.userId = user?.userId;

  const result = await Booking.create(modiFiedBookingData);
  return result;
};

const getMyAllBookingFromDB = async (userId: string) => {
  const result = await Booking.find({ userId: userId });

  if (result.length <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no booking found');
  }

  return result;
};

export const BookingServices = { addBookingInToDB, getMyAllBookingFromDB };
