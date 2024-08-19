import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const addBookingInToDB = async (payload: TBooking) => {
  const bookingData = { ...payload };
  bookingData.returnTime = null;
  bookingData.isReturned = false;
  bookingData.totalCost = 0;

  const result = await Booking.create(bookingData);
  return result;
};

const getMyAllBookingFromDB = async () => {
  const result = await Booking.find();
  return result;
};

export const BookingServices = { addBookingInToDB, getMyAllBookingFromDB };
