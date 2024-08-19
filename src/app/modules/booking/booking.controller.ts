import { Request, Response, NextFunction } from 'express';

import { BookingServices } from './booking.services';

const addBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingData = req.body;
    const result = await BookingServices.addBookingInToDB(bookingData);

    // send response to client
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Bike returned successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getMyAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingServices.getMyAllBookingFromDB();

    // send response to client
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Rentals retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookingController = {
  addBooking,
  getMyAllBooking,
};
