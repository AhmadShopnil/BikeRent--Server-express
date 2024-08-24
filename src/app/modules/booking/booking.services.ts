import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUserJwtPayload } from '../user/user.interface';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Bike } from '../bike/bike.model';
import { Types } from 'mongoose';

const addBookingInToDB = async ({
  bookingData,
  user,
}: {
  bookingData: TBooking;
  user: TUserJwtPayload;
}) => {
  const wishToRentBike = await Bike.findById({ _id: bookingData?.bikeId });
  if (wishToRentBike?.isAvailable === false) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike is not available for rent');
  }

  // Task-1

  /// change bike available status after return the bike
  const rentedBike = await Bike.findByIdAndUpdate(
    { _id: bookingData?.bikeId },
    { isAvailable: false },
  );
  if (!rentedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found for booking');
  }

  const modiFiedBookingData = { ...bookingData };
  // modiFiedBookingData.returnTime = null;
  // modiFiedBookingData.isReturned = false;
  // modiFiedBookingData.totalCost = 0;
  modiFiedBookingData.userId = user?.userId;

  const result = await Booking.create(modiFiedBookingData);

  return result;
};

const getMyAllBookingFromDB = async (userId: Types.ObjectId) => {
  const result = await Booking.find({ userId: userId });

  if (result.length <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no booking found');
  }

  return result;
};

const bikeReturn = async ({ bookingId }: { bookingId: string }) => {
  const bookingData = await Booking.findById({ _id: bookingId });

  if (!bookingData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rental record not found');
  }

  if (bookingData.isReturned) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Bike has already been returned',
    );
  }

  // Task-1

  /// change bike available status after return the bike
  const rentedBike = await Bike.findByIdAndUpdate(
    { _id: bookingData?.bikeId },
    { isAvailable: true },
  );
  if (!rentedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  // Task-2

  // Get the current time as returnTime
  const returnTime = new Date();

  // Calculate the rental duration in hours
  const durationInHours =
    Math.abs(returnTime.getTime() - new Date(bookingData.startTime).getTime()) /
    36e5;

  // Calculate the total cost
  const totalCost = durationInHours * rentedBike.pricePerHour;
  // Update the booking record
  const updatedBookingInfo = {
    returnTime: returnTime,
    totalCost: totalCost,
    isReturned: true,
  };

  const returnedBookingInfo = await Booking.findByIdAndUpdate(
    { _id: bookingId },
    { $set: updatedBookingInfo },
    {
      new: true,
    },
  );

  return returnedBookingInfo;
  // End
};

export const BookingServices = {
  addBookingInToDB,
  getMyAllBookingFromDB,
  bikeReturn,
};
