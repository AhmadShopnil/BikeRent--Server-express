import { Request, Response, NextFunction } from 'express';

import { BookingServices } from './booking.services';

const addBooking = async (req: any, res: Response, next: NextFunction) => {
  try {
    const bookingData = req.body;
    const user = req.user;

    const result = await BookingServices.addBookingInToDB({
      bookingData,
      user,
    });

    // send response to client
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Rental created successfully',
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
    const user = req.user;
    const result = await BookingServices.getMyAllBookingFromDB(user.userId);

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
const returnBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await BookingServices.bikeReturn({ bookingId: id });

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bike returned successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookingController = {
  addBooking,
  getMyAllBooking,
  returnBike,
};
