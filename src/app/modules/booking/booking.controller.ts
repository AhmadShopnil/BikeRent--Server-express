import { Request, Response, NextFunction } from 'express';

import { BookingServices } from './booking.services';
import { CustomRequest } from '../../interface/CustomRequest';
import { TUserJwtPayload } from '../user/user.interface';

const addBooking = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookingData = req.body;
    const user = req.user as TUserJwtPayload;

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
const getAllBooking = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingServices.getAllBookingFromDB();

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
const getMyAllBooking = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as TUserJwtPayload;
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


const getSingBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await BookingServices.getBookingByIdFromDB({
      bookingId: id,
    });

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get Booking data successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getSingBookingByTranId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { transactionId } = req.params;


console.log(transactionId)

    const result = await BookingServices.getBookingByTranIdFromDB({
      transactionId
    });

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get Booking data successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const deleteSingBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await BookingServices.deleteBookingByIdFromDB({
      bookingId: id,
    });

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Delete Booking data successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const returnBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id)
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
  getSingBookingById,
  getAllBooking,
  deleteSingBookingById,
  getSingBookingByTranId,
};
